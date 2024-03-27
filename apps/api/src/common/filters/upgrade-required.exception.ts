import { HttpException } from '@nestjs/common'

export class UpgradeRequiredException extends HttpException {
  constructor(description: string = 'Upgrade Required') {
    super(description, 426)
  }
}
