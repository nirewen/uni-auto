import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { BaseModule } from './base/base.module'
import { CommonModule } from './common/common.module'

import { WinstonModule } from 'nest-winston'
import { configuration } from './config/configuration'

import * as winston from 'winston'

const LokiTransport = require('winston-loki')

@Module({
  imports: [
    AuthModule,
    BaseModule,
    CommonModule,
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
    WinstonModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.json(),
            level: 'debug',
          }),
          new LokiTransport({
            host: config.get<string>('loki.host'),
            json: true,
            labels: {
              job: 'uni-auto-api',
            },
            batching: false,
            replaceTimestamp: true,
          }),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
