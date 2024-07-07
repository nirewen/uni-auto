import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from '@uni-auto/shared/entities/queue.entity'
import { User } from '@uni-auto/shared/entities/user.entity'
import { Repository } from 'typeorm'

export type MonthlyStats = {
  year: number
  month: number
  count: number
}

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Queue) private queueRepository: Repository<Queue>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getConnectionStats() {
    return this.queueRepository.manager
      .createQueryBuilder(Queue, 'queue')
      .select([
        'EXTRACT(YEAR FROM "createdAt") AS year',
        'EXTRACT(MONTH FROM "createdAt") AS month',
        'COUNT(*)::INT AS count',
      ])
      .groupBy('year, month')
      .orderBy('year, month')
      .getRawMany<MonthlyStats>()
  }

  public async getUsersStats() {
    return this.userRepository.manager
      .createQueryBuilder(User, 'user')
      .select([
        'EXTRACT(YEAR FROM "createdAt") AS year',
        'EXTRACT(MONTH FROM "createdAt") AS month',
        'COUNT(*)::INT AS count',
      ])
      .groupBy('year, month')
      .orderBy('year, month')
      .getRawMany<MonthlyStats>()
  }
}
