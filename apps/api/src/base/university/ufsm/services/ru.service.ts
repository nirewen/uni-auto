import { Logger } from '@nestjs/common'
import {
  MenuOptions,
  RestaurantInterface,
  ScheduleOptions,
} from 'src/interfaces/ru.interface'

import * as dayjs from 'dayjs'
import { Credentials } from '../interfaces/credentials.interface'
import { APIService } from './api.service'

export class RUService extends RestaurantInterface<Credentials> {
  private logger = new Logger(RUService.name)

  constructor(private api: APIService) {
    super()
  }

  async handleCron(): Promise<void> {
    const currentDay = dayjs('2023-08-20')
    const weekday = currentDay.day()
    const days = [1, 2, 3].map(n => {
      const day = currentDay.add(n + (weekday === 0 ? 0 : 1), 'day')

      return {
        date: day,
        day: day.day(),
      }
    })
    const selectedDays = [
      {
        restaurant: 2,
        weekday: 1,
        meals: [1],
      },
      {
        restaurant: 1,
        weekday: 1,
        meals: [2],
      },
      {
        restaurant: 1,
        weekday: 2,
        meals: [1, 2],
      },
      {
        restaurant: 1,
        weekday: 4,
        meals: [2],
      },
    ]

    const schedules = selectedDays
      .filter(selectedDay => days.some(day => day.day === selectedDay.weekday))
      .map(async selectedDay => {
        const day = days.find(day => day.day === selectedDay.weekday)

        const meals = await this.menu({
          day: day.date.format('DD/MM/YYYY'),
          restaurant: selectedDay.restaurant,
          credentials: {
            deviceId: '',
            accessToken: '',
          },
        }).then(meals =>
          meals.filter(meal => selectedDay.meals.includes(meal.idRefeicao))
        )

        return {
          day: day.date.format('YYYY-MM-DD HH:mm:ss'),
          restaurant: selectedDay.restaurant,
          meals,
          credentials: {
            deviceId: '',
            accessToken: '',
          },
        }
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
  useFactory: (api: APIService) => new RUService(api),
  inject: [APIService],
}
