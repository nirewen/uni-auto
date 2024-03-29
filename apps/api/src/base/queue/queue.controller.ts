import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { Queue } from '@uni-auto/shared/entities/queue.entity'
import { UserRole } from '@uni-auto/shared/entities/user.entity'
import { RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { TableQueryDto } from 'src/common/dto/table-query.dto'
import { QueueService } from './queue.service'

@Controller('queue')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  getAllQueue(@Query() query: TableQueryDto<Queue>) {
    return this.queueService.getAllQueue(query)
  }
}
