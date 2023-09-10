import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { ReqUser } from 'src/common/decorators'
import { User } from 'src/entities/user.entity'
import { ConnectionsService } from './connections.service'
import { UpdateSettingsDTO } from './interfaces/update-settings.dto'

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Get('@me')
  me(@ReqUser() user: User) {
    return this.connectionsService.getAllConnections(user)
  }

  @Get('/:id')
  getConnection(@ReqUser() user: User, @Param('id') id: string) {
    return this.connectionsService.findConnectionByUser(id, user)
  }

  @Patch(':slug')
  public updateSettings(
    @Param('slug') slug: string,
    @ReqUser() user: User,
    @Body() body: UpdateSettingsDTO
  ) {
    return this.connectionsService.updateSettings(slug, user, body)
  }
}
