import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class SchedulingService {
  private readonly logger = new Logger(SchedulingService.name)

  @Cron('0 9 * * 0,2')
  handleCron() {
    this.logger.debug('Executando agendamentos...')
  }
}
