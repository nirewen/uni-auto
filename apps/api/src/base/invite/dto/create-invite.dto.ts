import { IsBoolean, IsOptional, IsUUID } from 'class-validator'

export class CreateInviteDto {
  @IsBoolean()
  @IsOptional()
  active: boolean = true

  @IsUUID()
  @IsOptional()
  assignedTo: string

  @IsUUID()
  @IsOptional()
  usableBy: string

  @IsUUID()
  @IsOptional()
  createdBy: string
}
