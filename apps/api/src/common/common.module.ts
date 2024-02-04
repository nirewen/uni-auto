import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Queue } from '@uni-auto/shared/entities/queue.entity'
import { QueueService } from './services/queue.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Queue])],
  controllers: [],
  providers: [QueueService],
  exports: [QueueService],
})
export class CommonModule {}
