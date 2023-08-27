export interface ScheduleOptions {
  dateStart: string
  meals: number[]
  restaurant: number
}

export interface MenuOptions {
  day: string
  restaurant: number
}

export interface GroupedMeal {
  meals: number[]
  dateStart: string
  dateEnd: string
  restaurant: number
}
