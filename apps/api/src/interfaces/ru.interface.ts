export interface ScheduleOptions {
  dateStart: string
  meals: number[]
  restaurant: number
}

export interface AllowancesOptions {
  day: string
  restaurant: number
}

export interface MenuOptions {
  dateStart: string
  dateEnd: string
}

export interface GroupedMeal {
  meals: number[]
  dateStart: string
  dateEnd: string
  restaurant: number
}
