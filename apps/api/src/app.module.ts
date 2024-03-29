import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import { SharedConfigModule } from '@uni-auto/shared/config/shared-config.module'

import { AuthModule } from './auth/auth.module'
import { BaseModule } from './base/base.module'
import { LoggingInterceptor } from './common/filters/logging.interceptor'

@Module({
  imports: [
    AuthModule,
    BaseModule,
    ScheduleModule.forRoot(),
    SharedConfigModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
