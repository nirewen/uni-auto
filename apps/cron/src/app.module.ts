import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { SharedConfigModule } from '@uni-auto/shared/config/shared-config.module'

import { QueueModule } from './queue/queue.module'

@Module({
  imports: [QueueModule, ScheduleModule.forRoot(), SharedConfigModule],
})
export class AppModule {}
