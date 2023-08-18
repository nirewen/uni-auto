import { IsString } from 'class-validator'

export class EnableModuleDTO {
  @IsString()
  connection: string
}
