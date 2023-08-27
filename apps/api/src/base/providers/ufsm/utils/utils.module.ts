import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { APIService } from './services/api.service'
import { RUService } from './services/ru.service'

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('UFSM_API_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [APIService, RUService],
  exports: [APIService, RUService],
})
export class UtilsModule {}
