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
@Roles(UserRole.USER, UserRole.ADMIN)
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get(':provider')
  public getModules(@Param('provider') provider: string) {
    return this.modulesService.getModules(provider)
  }

  @Post(':slug/toggle')
  public enable(
    @Param('slug') slug: string,
    @ReqUser() user: User,
    @Body() body: EnableModuleDTO
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
  public deleteModule(
    @Param('slug') slug: string,
    @Body() body: EnableModuleDTO
  ) {
    if (!body.connection) {
      throw new BadRequestException('Connection is required')
    }

    return this.modulesService.deleteModule(slug, body)
  }
}
