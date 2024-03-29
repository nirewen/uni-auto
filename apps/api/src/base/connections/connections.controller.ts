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
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser, Roles } from 'src/common/decorators'
import { SortingOptions } from 'src/common/filters/data-table.filter'
import { ConnectionsService } from './connections.service'
import { UpdateSettingsDTO } from './interfaces/update-settings.dto'

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  getAll(
    @Query('query') filter: string,
    @Query('pagination')
    pagination: IPaginationOptions = { page: 1, limit: 10 },
    @Query('sorting')
    sorting: SortingOptions<Connection> = { id: 'createdAt', desc: 'false' },
  ) {
    return this.connectionsService.getAll({ filter, pagination, sorting })
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
