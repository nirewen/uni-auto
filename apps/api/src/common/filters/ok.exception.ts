import { HttpException, HttpStatus } from '@nestjs/common'

export class OkResponse extends HttpException {
  constructor(description: string = 'OK') {
    super(description, HttpStatus.OK)
  }
}
