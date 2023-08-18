import { UFSMController } from './ufsm.controller'
import { Module } from '@nestjs/common'
import { SchedulingService } from 'src/common/providers/scheduling.service'
import { RestaurantService } from './services/ru.service'
import { HttpModule } from '@nestjs/axios'
import { NameService } from './providers/name.service'
import { CronService } from './providers/cron.service'
import { APIService } from './services/api.service'
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
  controllers: [UFSMController],
  providers: [
    APIService,
    SchedulingService,
    RestaurantService,
    NameService,
    CronService,
  ],
})
export class UFSMModule {}
