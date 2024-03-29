import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Queue } from '@uni-auto/shared/entities/queue.entity'
import { QueueController } from './queue.controller'
import { QueueService } from './queue.service'

@Module({
  imports: [TypeOrmModule.forFeature([Queue])],
  controllers: [QueueController],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
