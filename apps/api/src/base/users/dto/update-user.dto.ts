import { IsEnum, IsOptional, IsString, Length } from 'class-validator'
import { UserRole } from 'src/entities/user.entity'

export class UpdateUserDTO {
  @IsString()
  @Length(6)
  password: string

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole
}
