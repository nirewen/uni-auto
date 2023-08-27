import { IsDateString, Matches } from 'class-validator'
import { MenuOptions } from 'src/interfaces/ru.interface'

const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/

export class MenuDTO implements MenuOptions {
  @IsDateString()
  @Matches(dateRegex, { message: 'Invalid date. Use YYYY-MM-DD' })
  dateStart: string

  @IsDateString()
  @Matches(dateRegex, { message: 'Invalid date. Use YYYY-MM-DD' })
  dateEnd: string
}
