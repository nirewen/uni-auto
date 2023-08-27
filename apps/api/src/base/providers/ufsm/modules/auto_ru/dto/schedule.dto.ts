import { IsArray, IsDateString, IsNumber, Matches } from 'class-validator'
import { GroupedMeal } from 'src/interfaces/ru.interface'

const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/

export class ScheduleDTO implements GroupedMeal {
  @IsArray()
  @IsNumber({}, { each: true })
  meals: number[]

  @IsDateString()
  @Matches(dateRegex, { message: 'Invalid date. Use YYYY-MM-DD HH:mm:ss' })
  dateStart: string

  @IsDateString()
  @Matches(dateRegex, { message: 'Invalid date. Use YYYY-MM-DD HH:mm:ss' })
  dateEnd: string

  @IsNumber()
  restaurant: number
}
