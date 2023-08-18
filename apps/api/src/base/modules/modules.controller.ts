import { Body, Controller, Post } from '@nestjs/common'
import { EnableModuleDTO } from './dto/enable-module.dto'
import { ModulesService } from './modules.service'

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post('enable')
  public enable(@Body() body: EnableModuleDTO) {
    return this.modulesService.enable(body)
  }
}
