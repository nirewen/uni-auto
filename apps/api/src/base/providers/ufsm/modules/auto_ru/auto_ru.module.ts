import { Module } from '@nestjs/common'

import { CustomModule } from 'src/common/base/custom.module'
import { AutoRUService } from './auto_ru.service'
import { QueueService } from './providers/queue.service'

@Module({
  providers: [AutoRUService, QueueService],
})
export class AutoRuModule extends CustomModule {}
