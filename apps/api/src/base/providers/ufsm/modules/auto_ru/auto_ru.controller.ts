import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { Connection } from '@uni-auto/shared/entities/connection.entity'
import { CustomController } from 'src/common/base/custom.controller'
import { ReqUser } from 'src/common/decorators'
import { ConnectionHeaderGuard } from '../../guards/connection-header.guard'
import { RUService } from '../../utils/services/ru.service'
import { MenuDTO } from './dto/menu.dto'
import { ScheduleDTO } from './dto/schedule.dto'

@Controller('ufsm/ru')
export class AutoRuController extends CustomController {
  constructor(private ruService: RUService) {
    super()
  }

  @UseGuards(ConnectionHeaderGuard)
  @Post('agendar')
  async agendar(@ReqUser() user: Connection, @Body() body: ScheduleDTO) {
    return this.ruService.schedule(body, user)
  }

  @UseGuards(ConnectionHeaderGuard)
  @Get('cardapio')
  async getCardapio(@ReqUser() user: Connection, @Query() body: MenuDTO) {
    return this.ruService.menu(body, user)
  }
}
