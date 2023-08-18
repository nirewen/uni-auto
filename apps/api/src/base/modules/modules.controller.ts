import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { EnableModuleDTO } from './dto/enable-module.dto'
import { ModulesService } from './modules.service'
import { RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'

@Controller('modules')
@UseGuards(RolesGuard)
@Roles(UserRole.USER)
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post(':slug')
  public enable(@Param('slug') slug: string, @Body() body: EnableModuleDTO) {
    return this.modulesService.enable(slug, body)
  }

  @Delete(':slug')
  public disable(@Param('slug') slug: string, @Body() body: EnableModuleDTO) {
    return this.modulesService.disable(slug, body)
  }
}
