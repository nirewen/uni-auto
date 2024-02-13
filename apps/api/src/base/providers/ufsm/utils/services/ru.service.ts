import { Injectable } from '@nestjs/common'

import {
  AllowancesOptions,
  GroupedMeal,
  MenuOptions,
  ScheduleOptions,
} from 'src/interfaces/ru.interface'

import { differenceInDays, format, parseISO } from 'date-fns'
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
      const currentDate = parseISO(day.dateStart)

      if (
        group.meals.length === 0 ||
        (group.restaurant === day.restaurant &&
          group.meals.toString() === day.meals.toString() &&
          differenceInDays(currentDate, parseISO(group.dateEnd)) === 1)
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
          dateStart: format(parseISO(group.dateStart), 'yyyy-MM-dd HH:mm:ss'),
          dateEnd: format(parseISO(group.dateEnd), 'yyyy-MM-dd HH:mm:ss'),
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
        dateStart: format(parseISO(group.dateStart), 'yyyy-MM-dd HH:mm:ss'),
        dateEnd: format(parseISO(group.dateEnd), 'yyyy-MM-dd HH:mm:ss'),
        restaurant: group.restaurant,
        vegan: group.vegan,
      })
    }

    return result
  }
}
