import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UFSMController } from './ufsm.controller'

import { ProviderRegistry } from 'src/base/modules/provider.registry'
import { ModulesModule } from './modules/modules.module'
import { ProviderService } from './providers/provider.service'
import { APIService } from './services/api.service'

@Global()
@Module({
  imports: [
    ModulesModule,
    HttpModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('UFSM_API_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UFSMController],
  providers: [APIService, ProviderRegistry, ProviderService],
  exports: [APIService, ProviderRegistry, ProviderService],
})
export class UFSMProvider {}
