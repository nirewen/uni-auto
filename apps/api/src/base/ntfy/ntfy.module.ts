import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { NtfyController } from './ntfy.controller'
import { NtfyService } from './ntfy.service'

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('ntfy.instanceUrl'),
        headers: {
          Authorization: `Bearer ${config.get('ntfy.accessToken')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NtfyController],
  providers: [NtfyService],
  exports: [NtfyService],
})
export class NtfyModule {}
