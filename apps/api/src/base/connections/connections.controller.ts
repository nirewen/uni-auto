import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common'
import { Connection } from '@uni-auto/shared/entities/connection.entity'
import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser, Roles } from 'src/common/decorators'
import { TableQueryDto } from 'src/common/dto/table-query.dto'
import { ConnectionsService } from './connections.service'
import { UpdateSettingsDTO } from './interfaces/update-settings.dto'

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  getAll(@Query() query: TableQueryDto<Connection>) {
    return this.connectionsService.getAll(query)
  }

  @Get('@me')
  me(@ReqUser() user: User) {
    return this.connectionsService.getAllConnections(user)
  }

  @Get('/:id')
  getConnection(@ReqUser() user: User, @Param('id') id: string) {
    return this.connectionsService.findConnectionByUser(id, user)
  }

  @Get('/:id/:slug/settings')
  getConnectionSettings(
    @ReqUser() user: User,
    @Param('id') id: string,
    @Param('slug') slug: string,
  ) {
    return this.connectionsService.findConnectionSettings(user, id, slug)
  }

  @Patch(':slug/settings')
  public updateSettings(
    @ReqUser() user: User,
    @Param('slug') slug: string,
    @Body() body: UpdateSettingsDTO,
  ) {
    return this.connectionsService.updateSettings(user, slug, body)
  }

  @Delete(':id')
  public deleteConnection(@ReqUser() user: User, @Param('id') id: string) {
    return this.connectionsService.deleteConnection(user, id)
  }

  @Get('/:id/profile')
  public getProfile(
    @ReqUser() user: User,
    @Param('id') id: string,
    @Query('forced') forced: boolean = false,
  ) {
    return this.connectionsService.getProfile(user, id, forced)
  }

  @Get('/:id/health')
  public getProfileHealth(@ReqUser() user: User, @Param('id') id: string) {
    return this.connectionsService.getHealth(user, id)
  }
}
