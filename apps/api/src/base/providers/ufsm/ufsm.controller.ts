import { Body, Controller, Post, UseGuards } from '@nestjs/common'

import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { ReqUser, Roles } from 'src/common/decorators'
import { APIService } from './utils/services/api.service'

import { RolesGuard } from 'src/auth/guards'
import { ConnectionsService } from 'src/base/connections/connections.service'
import { NtfyService } from 'src/base/ntfy/ntfy.service'
import { CustomController } from 'src/common/base/custom.controller'
import { CreateConnectionDTO } from './dto/create-connection.dto'

@Controller('ufsm')
@UseGuards(RolesGuard)
@Roles(UserRole.USER, UserRole.ADMIN)
export class UfsmController extends CustomController {
  constructor(
    private api: APIService,
    private connectionService: ConnectionsService,
    private ntfy: NtfyService
  ) {
    super()
  }

  @Post('connect')
  async connect(@ReqUser() user: User, @Body() body: CreateConnectionDTO) {
    const credentials = await this.api.authorize(body)

    return this.connectionService.connect(
      {
        provider: this.provider.slug,
        identifier: body.login,
        token: credentials.token,
      },
      user
    )
  }
}
