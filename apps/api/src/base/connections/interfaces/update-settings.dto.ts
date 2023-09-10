import { IsObject, IsString } from 'class-validator'

export class UpdateSettingsDTO {
  @IsString()
  connectionId: string

  @IsObject()
  settings: Record<string, unknown>
}
