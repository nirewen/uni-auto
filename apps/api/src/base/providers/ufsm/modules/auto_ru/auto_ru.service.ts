import * as dayjs from 'dayjs'

import { Logger, Provider } from '@nestjs/common'
import { ModulesService } from 'src/base/modules/modules.service'
import { Connection } from 'src/entities/connection.entity'
import { ModuleInterface } from 'src/interfaces/module.interface'
import { UserSettings } from '../../interfaces/ru.interface'
import { RUService } from '../../services/ru.service'

export class AutoRU implements ModuleInterface {
  logger = new Logger(AutoRU.name)

  constructor(
    protected readonly modulesService: ModulesService,
    private readonly restaurantService: RUService
  ) {}

  async trigger() {
    this.logger.verbose('Triggering AutoRU')

    const modules = await this.modulesService.findEnabled('AutoRU')

    await Promise.all(
      modules.map(async module => {
        const settings = module.settings as UserSettings

        if (!module.connection || !settings) {
          return
        }

        return this.handleUser(module.connection, settings)
      })
    )
  }

  private async handleUser(connection: Connection, settings: UserSettings) {
    this.logger.verbose(`Handling user ${connection.identifier}`)

    const currentDay = dayjs()
    const weekday = currentDay.day()
    const days = Array(6)
      .fill(1)
      .slice(weekday, weekday + 3)
      .map((n, i) => {
        const day = currentDay.add(n + i + (weekday === 0 ? 0 : 1), 'day')

        return {
          date: day,
          day: day.day(),
        }
      })
      .filter(day => day.day !== 0)

    const schedules = settings.days
      .filter(selectedDay => days.some(day => day.day === selectedDay.weekday))
      .map(async selectedDay => {
        const day = days.find(day => day.day === selectedDay.weekday)

        const meals = await this.restaurantService
          .menu({
            day: day.date.format('DD/MM/YYYY'),
            restaurant: selectedDay.restaurant,
            credentials: {
              identifier: connection.identifier,
              token: connection.token,
            },
          })
          .then(meals =>
            meals.filter(meal => selectedDay.meals.includes(meal.id))
          )

        return this.restaurantService.schedule({
          day: day.date.format('YYYY-MM-DD HH:mm:ss'),
          restaurant: selectedDay.restaurant,
          meals: meals.map(meal => meal.id),
          credentials: {
            identifier: connection.identifier,
            token: connection.token,
          },
        })
      })

    await Promise.all(schedules)
  }
}

export const AutoRUService = {
  provide: ModuleInterface,
  useFactory: (modulesService: ModulesService, restaurantService: RUService) =>
    new AutoRU(modulesService, restaurantService),
  inject: [ModulesService, RUService],
} satisfies Provider
