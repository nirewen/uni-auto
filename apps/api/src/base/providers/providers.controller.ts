import { Controller, Get, Param, UnauthorizedException } from '@nestjs/common'
import { ReqUser } from 'src/common/decorators'
import { User, UserRole } from 'src/entities/user.entity'
import { ConnectionsService } from '../connections/connections.service'
import { ProvidersService } from './providers.service'

@Controller('providers')
export class ProvidersController {
  constructor(
    private readonly providersService: ProvidersService,
    private readonly connectionService: ConnectionsService
  ) {}

  @Get()
  getProviders() {
    return this.providersService.findAll()
  }

  @Get('profile/:connectionId')
  async profile(
    @ReqUser() user: User,
    @Param('connectionId') connectionId: string
  ) {
    const connection = await this.connectionService.findConnection(connectionId)

    if (connection.user.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource'
      )
    }

    const data = await this.providersService.getProfile(connection)

    return data
  }
}
