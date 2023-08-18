import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { EnableModuleDTO } from './dto/enable-module.dto'
import { ModulesService } from './modules.service'

@Controller('modules')
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
