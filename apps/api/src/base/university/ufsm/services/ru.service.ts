import { Logger } from '@nestjs/common'
import {
  MenuOptions,
  RestaurantInterface,
  ScheduleOptions,
} from 'src/interfaces/ru.interface'

import * as dayjs from 'dayjs'
import { Credentials } from '../interfaces/credentials.interface'
import { APIService } from './api.service'
import { ModulesService } from 'src/base/modules/modules.service'
import { UserSettings } from '../interfaces/ru.interface'
import { Connection } from 'src/entities/connection.entity'

export class RUService extends RestaurantInterface<Credentials> {
  private logger = new Logger(RUService.name)

  constructor(private api: APIService, private modulesService: ModulesService) {
    super()
  }

  async handleCron() {
    const modules = await this.modulesService.findEnabledByProvider('ufsm')

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

  async handleUser(
    connection: Connection,
    settings: UserSettings
  ): Promise<void> {
    const currentDay = dayjs()
    const weekday = currentDay.day()
    const days = [1, 2, 3].map(n => {
      const day = currentDay.add(n + (weekday === 0 ? 0 : 1), 'day')

      return {
        date: day,
        day: day.day(),
      }
    })

    const schedules = settings.days
      .filter(selectedDay => days.some(day => day.day === selectedDay.weekday))
      .map(async selectedDay => {
        const day = days.find(day => day.day === selectedDay.weekday)

        const meals = await this.menu({
          day: day.date.format('DD/MM/YYYY'),
          restaurant: selectedDay.restaurant,
          credentials: {
            identifier: connection.identifier,
            token: connection.token,
          },
        }).then(meals =>
          meals.filter(meal => selectedDay.meals.includes(meal.id))
        )

        return this.schedule({
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

  async schedule(options: ScheduleOptions<Credentials>) {
    return true
  }

  async menu(options: MenuOptions<Credentials>) {
    return this.api.getBeneficios(options)
  }
}

export const RestaurantService = {
  provide: RestaurantInterface,
  useFactory: (api: APIService, modulesService: ModulesService) =>
    new RUService(api, modulesService),
  inject: [APIService, ModulesService],
}
