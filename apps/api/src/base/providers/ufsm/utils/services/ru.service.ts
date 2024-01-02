import { Injectable } from '@nestjs/common'

import {
  AllowancesOptions,
  GroupedMeal,
  MenuOptions,
  ScheduleOptions,
} from 'src/interfaces/ru.interface'

import * as dayjs from 'dayjs'
import { Credentials } from '../../interfaces/credentials.interface'
import { APIService } from './api.service'

@Injectable()
export class RUService {
  constructor(private api: APIService) {}

  async schedule(options: GroupedMeal, credentials: Credentials) {
    return this.api.agendarRefeicao(options, credentials)
  }

  async meals(options: AllowancesOptions, credentials: Credentials) {
    return this.api.getBeneficios(options, credentials)
  }

  async menu(options: MenuOptions, credentials: Credentials) {
    return this.api.getCardapio(options, credentials)
  }

  groupMeals(meals: ScheduleOptions[]) {
    const result: GroupedMeal[] = []

    let group = {
      meals: [],
      dateStart: null,
      dateEnd: null,
      restaurant: null,
      vegan: false,
    }

    for (const day of meals) {
      const currentDate = dayjs(day.dateStart)

      if (
        group.meals.length === 0 ||
        (group.restaurant === day.restaurant &&
          group.meals.toString() === day.meals.toString() &&
          currentDate.diff(group.dateEnd, 'day') === 1)
      ) {
        if (group.meals.length === 0) {
          group.dateStart = currentDate
          group.restaurant = day.restaurant
          group.meals = day.meals.slice()
        }
        group.dateEnd = currentDate
      } else {
        result.push({
          meals: group.meals,
          dateStart: dayjs(group.dateStart).format('YYYY-MM-DD HH:mm:ss'),
          dateEnd: dayjs(group.dateEnd).format('YYYY-MM-DD HH:mm:ss'),
          restaurant: group.restaurant,
          vegan: group.vegan,
        })

        group.dateStart = currentDate
        group.dateEnd = currentDate
        group.restaurant = day.restaurant
        group.meals = day.meals.slice()
      }
    }

    if (group.meals.length > 0) {
      result.push({
        meals: group.meals,
        dateStart: dayjs(group.dateStart).format('YYYY-MM-DD HH:mm:ss'),
        dateEnd: dayjs(group.dateEnd).format('YYYY-MM-DD HH:mm:ss'),
        restaurant: group.restaurant,
        vegan: group.vegan,
      })
    }

    return result
  }
}
