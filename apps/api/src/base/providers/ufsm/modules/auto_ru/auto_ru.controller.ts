import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { CustomController } from 'src/common/base/custom.controller'
import { Public, ReqUser } from 'src/common/decorators'
import { BasicAuthGuard } from '../../guards/auth.guard'
import { ConnectionHeaderGuard } from '../../guards/connection-header.guard'
import { RUService } from '../../utils/services/ru.service'
import { MenuDTO } from './dto/menu.dto'
import { ScheduleDTO } from './dto/schedule.dto'

@Controller('ufsm/ru')
export class AutoRuController extends CustomController {
  constructor(private ruService: RUService) {
    super()
  }

  @Public()
  @UseGuards(BasicAuthGuard, ConnectionHeaderGuard)
  @Post('agendar')
  async agendar(@ReqUser() user, @Body() body: ScheduleDTO) {
    return this.ruService.schedule(body, user)
  }

  @Public()
  @UseGuards(BasicAuthGuard, ConnectionHeaderGuard)
  @Get('cardapio')
  async getCardapio(@ReqUser() user, @Query() body: MenuDTO) {
    return this.ruService.menu(body, user)
  }
}
