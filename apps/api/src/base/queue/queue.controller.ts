import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { Queue } from '@uni-auto/shared/entities/queue.entity'
import { UserRole } from '@uni-auto/shared/entities/user.entity'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { SortingOptions } from 'src/common/filters/data-table.filter'
import { QueueService } from './queue.service'

@Controller('queue')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  getAllQueue(
    @Query('query') filter: string,
    @Query('pagination')
    pagination: IPaginationOptions = { page: 1, limit: 10 },
    @Query('sorting')
    sorting: SortingOptions<Queue> = { id: 'createdAt', desc: 'false' },
  ) {
    return this.queueService.getAllQueue({
      filter,
      pagination,
      sorting,
    })
  }
}
