import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { Connection } from '@uni-auto/shared/entities/connection.entity'
import { CronJob } from 'cron'
import { ModulesService } from 'src/base/modules/modules.service'
import { ModuleService } from 'src/common/base/module.service'
import { QueueService } from 'src/common/services/queue.service'
import { UserSettings } from '../../../interfaces/ru.interface'
import { RUService } from '../../../utils/services/ru.service'

import { add, format } from 'date-fns'

export interface AutoRUSettings {
  cron: string
}

@Injectable()
export class EnqueueService extends ModuleService {
  job: CronJob

  constructor(
    private modulesService: ModulesService,
    private schedulerRegistry: SchedulerRegistry,
    private queueService: QueueService,
    private ruService: RUService
  ) {
    super()
  }

  async onServiceInit() {
    const moduleSettings = await this.getSettings()

    this.job = new CronJob(moduleSettings.settings.cron, () => {
      this.enqueue()
    })

    this.job.start()

    this.schedulerRegistry.addCronJob(moduleSettings.module.slug, this.job)

    this.logger.log({
      message: `Registered cron job: ${moduleSettings.settings.cron}`,
      labels: {
        module: moduleSettings.module.name,
        provider: moduleSettings.provider.name,
      },
    })
  }

  async getSettings() {
    return this.modulesService
      .findModuleSettings(this.module.slug, this.provider.slug)
      .then((moduleSettings) => {
        const settings = moduleSettings.settings as AutoRUSettings

        return { ...moduleSettings, settings }
      })
  }

  async enqueue() {
    const module = await this.getSettings()

    if (!module.enabled) {
      return
    }

    const modules = await this.modulesService.findEnabled(
      this.provider.slug,
      this.module.slug
    )

    await Promise.all(
      modules.map(async (moduleSettings) => {
        const settings = moduleSettings.settings as UserSettings

        if (!moduleSettings.connection || !settings) {
          return
        }

        this.handleUser(moduleSettings.connection, settings)
      })
    )
  }

  private async handleUser(connection: Connection, settings: UserSettings) {
    this.logger.verbose(`Enqueueing user ${connection.identifier}`)

    const currentDay = new Date()
    const weekday = currentDay.getDay()
    const days = Array(6)
      .fill(1)
      .slice(weekday, weekday + 3)
      .map((n, i) => {
        const day = add(currentDay, {
          days: n + i + (weekday === 0 ? 0 : 1),
        })

        return {
          date: day,
          day: day.getDay(),
        }
      })
      .filter((day) => day.day !== 0)

    const schedules = await Promise.all(
      settings.days
        .filter((selectedDay) =>
          days.some((day) => day.day === selectedDay.weekday)
        )
        .map(async (selectedDay) => {
          const day = days.find((day) => day.day === selectedDay.weekday)

          const meals = await this.ruService
            .meals(
              {
                day: format(day.date, 'DD/MM/YYYY'),
                restaurant: selectedDay.restaurant,
              },
              connection
            )
            .then((meals) =>
              meals.filter((meal) => selectedDay.meals.includes(meal.id))
            )
            .catch(() => [])

          if (meals.length === 0) {
            return
          }

          return {
            dateStart: format(day.date, 'YYYY-MM-DD HH:mm:ss'),
            restaurant: selectedDay.restaurant,
            meals: meals.map((meal) => meal.id),
          }
        })
    )

    const meals = this.ruService.groupMeals(schedules.filter(Boolean))

    if (settings.vegan) {
      meals.forEach((meal) => {
        meal.vegan = true
      })
    }

    await Promise.all(
      meals.map((meal) =>
        this.queueService.enqueue(meal, connection, '/ufsm/ru/agendar')
      )
    )
  }
}
