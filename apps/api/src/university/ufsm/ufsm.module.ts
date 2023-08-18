import { Module } from '@nestjs/common'
import { CRON_EXPRESSION, SchedulingService } from 'src/base/scheduling.service'
import { RestaurantInterface } from '../../interfaces/ru.interface'
import { RestaurantService } from './services/ru.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.UFSM_API_URL,
    }),
  ],
  controllers: [],
  providers: [
    SchedulingService,
    {
      provide: 'UNIVERSITY',
      useValue: 'UFSM',
    },
    {
      provide: CRON_EXPRESSION,
      useValue: '*/5 * * * * *',
    },
    {
      provide: RestaurantInterface,
      useClass: RestaurantService,
    },
  ],
})
export class UFSMModule {}
