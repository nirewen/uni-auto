import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Queue } from '@uni-auto/shared/entities/queue.entity'
import { User } from '@uni-auto/shared/entities/user.entity'
import { StatsController } from './stats.controller'
import { StatsService } from './stats.service'

@Module({
  imports: [TypeOrmModule.forFeature([Queue, User])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
