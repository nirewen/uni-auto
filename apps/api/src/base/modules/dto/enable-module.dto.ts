import { IsString } from 'class-validator'

export class EnableModuleDTO {
  @IsString()
  module: string

  @IsString()
  connection: string
}
