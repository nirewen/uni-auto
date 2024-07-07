import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserRole } from '@uni-auto/shared/entities/user.entity'
import { RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { StatsService } from './stats.service'

@Controller('stats')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class StatsController {
  constructor(private service: StatsService) {}

  @Get()
  public async getStats() {
    const [users, queue] = await Promise.all([
      this.service.getUsersStats(),
      this.service.getConnectionStats(),
    ])

    return { users, queue }
  }
}
