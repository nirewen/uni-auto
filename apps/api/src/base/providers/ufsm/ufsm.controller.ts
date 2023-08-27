import { Body, Controller, Post, UseGuards } from '@nestjs/common'

import { ReqUser, Roles } from 'src/common/decorators'
import { User, UserRole } from 'src/entities/user.entity'
import { APIService } from './utils/services/api.service'

import { RolesGuard } from 'src/auth/guards'
import { ConnectionsService } from 'src/base/connections/connections.service'
import { CreateConnectionDTO } from './dto/create-connection.dto'

@Controller('ufsm')
@UseGuards(RolesGuard)
@Roles(UserRole.USER, UserRole.ADMIN)
export class UfsmController {
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
