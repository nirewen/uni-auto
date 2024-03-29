import { Module } from '@nestjs/common'

import { QueueModule } from 'src/base/queue/queue.module'
import { CustomModule } from 'src/common/base/custom.module'
import { AutoRuController } from './auto_ru.controller'
import { EnqueueService } from './providers/enqueue.service'

@Module({
  imports: [QueueModule],
  controllers: [AutoRuController],
  providers: [EnqueueService],
})
export class AutoRuModule extends CustomModule {}
