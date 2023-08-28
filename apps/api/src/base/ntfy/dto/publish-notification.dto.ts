import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'
import { Action, NtfyPayload } from '../ntfy.interface'

export class PublishNotificationDTO implements NtfyPayload {
  @IsString()
  @IsOptional()
  message: string

  @IsString()
  @IsOptional()
  title: string

  @IsString({ each: true })
  @IsOptional()
  tags: string[]

  @IsNumber()
  @IsOptional()
  priority: number

  @IsString()
  @IsOptional()
  attach: string

  @IsString()
  @IsOptional()
  filename: string

  @IsString()
  @IsOptional()
  click: string

  @IsArray()
  @IsOptional()
  actions: Action[]
}
