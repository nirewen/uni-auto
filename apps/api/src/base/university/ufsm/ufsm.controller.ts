import { Body, Controller, Post } from '@nestjs/common'

import { APIService } from './services/api.service'
import { ReqUser } from 'src/common/decorators'
import { User } from 'src/entities/user.entity'

import { ConnectionsService } from 'src/base/connections/connections.service'
import { CreateConnectionDTO } from './dto/create-connection.dto'

@Controller('ufsm')
export class UFSMController {
  constructor(
    private api: APIService,
    private connectionService: ConnectionsService
  ) {}

  @Post('connect')
  async connect(@ReqUser() user: User, @Body() body: CreateConnectionDTO) {
    const credentials = await this.api.authorize(body)

    return this.connectionService.connect({
      provider: 'ufsm',
      identifier: body.login,
      token: credentials.token,
      userId: user.id,
    })
  }
}
