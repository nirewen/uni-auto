import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser, Roles } from 'src/common/decorators'
import { User, UserRole } from 'src/entities/user.entity'
import { EnableModuleDTO } from './dto/enable-module.dto'
import { ModulesService } from './modules.service'

@Controller('modules')
@UseGuards(RolesGuard)
@Roles(UserRole.USER, UserRole.ADMIN)
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

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
}
