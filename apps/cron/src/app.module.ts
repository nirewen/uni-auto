import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { QueueModule } from './queue/queue.module'

import { configuration } from './config/configuration'

@Module({
  imports: [
    QueueModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
