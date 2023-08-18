import { IsString } from 'class-validator'

export class CreateConnectionDTO {
  @IsString()
  login: string

  @IsString()
  senha: string
}
