import { Module } from '@nestjs/common'

import { SchedulingService } from 'src/common/providers/scheduling.service'

import { CustomModule } from 'src/base/modules/custom.module'
import { RUService } from '../../services/ru.service'
import { AutoRUService } from './auto_ru.service'
import { CronService } from './providers/cron.service'

@Module({
  providers: [SchedulingService, RUService, AutoRUService, CronService],
})
export class AutoRUModule extends CustomModule {}
