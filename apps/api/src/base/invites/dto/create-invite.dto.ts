import { InviteCodeRole } from '@uni-auto/shared/entities/invite-code.entity'
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

export class CreateInviteDto {
  @IsString()
  @IsOptional()
  code: string

  @IsEnum(InviteCodeRole)
  @IsOptional()
  role: InviteCodeRole = InviteCodeRole.ACCOUNT_ACTIVATION

  @IsNumber()
  @IsOptional()
  maxUses: number = 1

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
