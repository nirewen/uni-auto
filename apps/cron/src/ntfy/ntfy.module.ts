import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { NtfyService } from './ntfy.service'

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('NTFY_INSTANCE_URL'),
        headers: {
          Authorization: `Bearer ${config.get('NTFY_ACCESS_TOKEN')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [NtfyService],
  exports: [NtfyService],
})
export class NtfyModule {}
