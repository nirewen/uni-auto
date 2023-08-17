import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SchedulingModule } from './scheduling/scheduling.module'

@Module({
  imports: [SchedulingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
