import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { QueueModule } from './queue/queue.module'

import { ConnectionModule } from '@uni-auto/shared/entities/connection-module.entity'
import { Connection } from '@uni-auto/shared/entities/connection.entity'
import { ModuleSettings } from '@uni-auto/shared/entities/module-settings.entity'
import { Module as ModuleEntity } from '@uni-auto/shared/entities/module.entity'
import { Provider } from '@uni-auto/shared/entities/provider.entity'
import { Queue } from '@uni-auto/shared/entities/queue.entity'
import { User } from '@uni-auto/shared/entities/user.entity'
import { configuration } from './config/configuration'

@Module({
  imports: [
    QueueModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // TODO: modularize the TypeOrmModule configuration
    TypeOrmModule.forFeature([
      ConnectionModule,
      Connection,
      ModuleSettings,
      ModuleEntity,
      Provider,
      Queue,
      User,
    ]),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
