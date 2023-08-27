import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Queue } from 'src/entities/queue.entity'
import { QueueService } from './queue.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Queue]),
    HttpModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('API_BASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [QueueService],
})
export class QueueModule {}
