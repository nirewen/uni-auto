import { Module } from '@nestjs/common'

import { ScheduleModule } from '@nestjs/schedule'
import { SchedulingService } from './scheduling.service'

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [SchedulingService],
})
export class SchedulingModule {}
