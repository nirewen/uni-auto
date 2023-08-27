import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomModule } from 'src/common/base/custom.module'
import { Queue } from 'src/entities/queue.entity'
import { AutoRUService } from './auto_ru.service'
import { EnqueueService } from './providers/enqueue.service'

@Module({
  imports: [TypeOrmModule.forFeature([Queue])],
  providers: [AutoRUService, EnqueueService],
})
export class AutoRuModule extends CustomModule {}
