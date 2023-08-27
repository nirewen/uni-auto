import { IsArray, IsDateString, IsNumber } from 'class-validator'
import { GroupedMeal } from 'src/interfaces/ru.interface'

export class ScheduleDTO implements GroupedMeal {
  @IsArray()
  @IsNumber({}, { each: true })
  meals: number[]

  @IsDateString()
  dateStart: string

  @IsDateString()
  dateEnd: string

  @IsNumber()
  restaurant: number
}
