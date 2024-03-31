import { Transform } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional } from 'class-validator'

export class AvatarQueryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  size?: number = 256

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  raw?: boolean = false

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  forced?: boolean = false
}
