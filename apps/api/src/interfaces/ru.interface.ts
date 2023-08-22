import { Inject } from '@nestjs/common'

export interface ScheduleOptions<Credentials> {
  day: string
  meals: number[]
  restaurant: number
  credentials: Credentials
}

export interface MenuOptions<Credentials> {
  day: string
  restaurant: number
  credentials: Credentials
}
