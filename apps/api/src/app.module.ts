import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import { SharedConfigModule } from '@uni-auto/shared/config/shared-config.module'

import { AuthModule } from './auth/auth.module'
import { BaseModule } from './base/base.module'
import { CommonModule } from './common/common.module'
import { LoggingInterceptor } from './common/filters/logging.interceptor'

@Module({
  imports: [
    AuthModule,
    BaseModule,
    CommonModule,
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
