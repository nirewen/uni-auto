import { Module } from '@nestjs/common'
import { SchedulingService } from 'src/common/providers/scheduling.service'
import { RUService, RestaurantService } from './services/ru.service'
import { HttpModule } from '@nestjs/axios'
import { NameService } from './providers/name.service'
import { CronService } from './providers/cron.service'
import { APIService } from './services/api.service'
import { RestaurantInterface } from 'src/interfaces/ru.interface'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('UFSM_API_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    APIService,
    SchedulingService,
    RestaurantService,
    NameService,
    CronService,
  ],
})
export class UFSMModule {}
