import { IsBoolean, IsOptional, IsUUID } from 'class-validator'

export class EnableModuleDTO {
  @IsUUID()
  @IsOptional()
  connection: string

  @IsBoolean()
  @IsOptional()
  enabled: boolean
}
