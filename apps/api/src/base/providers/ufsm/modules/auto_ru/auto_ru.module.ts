import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Queue } from '@uni-auto/shared/entities/queue.entity'
import { CustomModule } from 'src/common/base/custom.module'
import { AutoRuController } from './auto_ru.controller'
import { EnqueueService } from './providers/enqueue.service'

@Module({
  imports: [TypeOrmModule.forFeature([Queue])],
  controllers: [AutoRuController],
  providers: [EnqueueService],
})
export class AutoRuModule extends CustomModule {}
