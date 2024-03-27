import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser, Roles } from 'src/common/decorators'
import { EnableModuleDTO } from './dto/enable-module.dto'
import { ModulesService } from './modules.service'

@Controller('modules')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get()
  public getAll() {
    return this.modulesService.getAll()
  }

  @Get(':provider')
  @Roles(UserRole.USER)
  public getModules(@Param('provider') provider: string) {
    return this.modulesService.getModules(provider)
  }

  @Post(':slug/toggle')
  @Roles(UserRole.USER)
  public enable(
    @Param('slug') slug: string,
    @ReqUser() user: User,
    @Body() body: EnableModuleDTO,
  ) {
    if (user.role === UserRole.ADMIN && !body.connection) {
      return this.modulesService.toggleModule(slug, body)
    }

    if (!body.connection) {
      throw new BadRequestException('Connection is required')
    }

    return this.modulesService.toggle(slug, body)
  }

  @Post(':slug/delete')
  @Roles(UserRole.USER)
  public deleteModule(
    @Param('slug') slug: string,
    @Body() body: EnableModuleDTO,
  ) {
    if (!body.connection) {
      throw new BadRequestException('Connection is required')
    }

    return this.modulesService.deleteModule(slug, body)
  }
}
