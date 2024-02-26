import { Injectable } from '@nestjs/common'

import {
  AllowancesOptions,
  GroupedMeal,
  MenuOptions,
  ScheduleOptions,
} from 'src/interfaces/ru.interface'

import { Connection } from '@uni-auto/shared/entities/connection.entity'
import { differenceInDays, format, parseISO } from 'date-fns'
import { APIService } from './api.service'

@Injectable()
export class RUService {
  constructor(private api: APIService) {}

  async schedule(options: GroupedMeal, connection: Connection) {
    return this.api.agendarRefeicao(options, connection)
  }

  async meals(options: AllowancesOptions, connection: Connection) {
    return this.api.getBeneficios(options, connection)
  }

  async menu(options: MenuOptions, connection: Connection) {
    return this.api.getCardapio(options, connection)
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
          differenceInDays(currentDate, group.dateEnd) === 1)
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
          dateStart: format(group.dateStart, 'yyyy-MM-dd HH:mm:ss'),
          dateEnd: format(group.dateEnd, 'yyyy-MM-dd HH:mm:ss'),
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
        dateStart: format(group.dateStart, 'yyyy-MM-dd HH:mm:ss'),
        dateEnd: format(group.dateEnd, 'yyyy-MM-dd HH:mm:ss'),
        restaurant: group.restaurant,
        vegan: group.vegan,
      })
    }

    return result
  }
}
