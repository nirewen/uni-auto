import { Logger } from '@nestjs/common'
import {
  MenuOptions,
  RestaurantInterface,
  ScheduleOptions,
} from 'src/interfaces/ru.interface'

import * as dayjs from 'dayjs'
import { Credentials } from '../interfaces/credentials.interface'
import { APIService } from './api.service'

export class RestaurantService extends RestaurantInterface<Credentials> {
  private logger = new Logger(RestaurantService.name)

  constructor(private api: APIService) {
    super()
  }

  async handleCron(): Promise<void> {
    const currentDay = dayjs()
    const weekday = currentDay.day()
    const days = [1, 2, 3].map(n => {
      const day = currentDay.add(n + (weekday === 0 ? 0 : 1), 'day')

      return {
        date: day.format('YYYY-MM-DD HH:mm:ss'),
        day: day.day(),
      }
    })
    const selectedDays = [
      {
        weekday: 1,
        meals: [2],
      },
      {
        weekday: 2,
        meals: [1, 2],
      },
      {
        weekday: 4,
        meals: [2],
      },
    ]

    const schedules = days
      .filter(day =>
        selectedDays.some(selectedDay => selectedDay.weekday === day.day)
      )
      .map(async day => {
        const selectedDay = selectedDays.find(d => d.weekday === day.day)

        const meals = await this.menu({
          day: day.date,
          credentials: {
            deviceId: '',
            accessToken: '',
          },
        }).then(meals =>
          meals.filter(meal => selectedDay.meals.includes(meal.idRefeicao))
        )

        return this.schedule({
          day: day.date,
          meals: meals.map(meal => meal.idRefeicao),
          restaurant: 1,
          credentials: {
            deviceId: '',
            accessToken: '',
          },
        })
      })

    await Promise.all(schedules)
  }

  async schedule(options: ScheduleOptions<Credentials>): Promise<any> {
    return true
  }

  async menu(
    options: MenuOptions<Credentials>
  ): Promise<{ idRefeicao: number }[]> {
    return this.api.getBeneficios(options.day, options.credentials)
  }
}
