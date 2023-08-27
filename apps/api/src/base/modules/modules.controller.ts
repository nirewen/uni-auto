import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { EnableModuleDTO } from './dto/enable-module.dto'
import { ModulesService } from './modules.service'

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

  // @Post(':provider/:slug/trigger')
  // @Roles(UserRole.ADMIN)
  // public async trigger(
  //   @Param('provider') provider: string,
  //   @Param('slug') slug: string
  // ) {
  //   const modules = this.providerRegistry.getModules(provider)

  //   if (!modules.has(slug)) {
  //     throw new BadRequestException(
  //       `Module ${slug} not found for provider ${provider}`
  //     )
  //   }

  //   await this.modulesService.findModuleBySlug(slug)

  //   const module = modules.get(slug)

  //   return module.trigger()
  // }
}
