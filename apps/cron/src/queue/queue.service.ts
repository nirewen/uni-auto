import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { firstValueFrom } from 'rxjs'
import { Queue, QueueStatus } from 'src/entities/queue.entity'
import { Repository } from 'typeorm'

@Injectable()
export class QueueService {
  logger = new Logger(QueueService.name)

  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  @Cron('0 * * * * *')
  handleQueue() {
    this.queueRepository.manager.transaction(async manager => {
      const queue = await manager
        .createQueryBuilder(Queue, 'queue')
        .innerJoinAndSelect('queue.connection', 'connection')
        .where('queue.status = :status', { status: 'PENDING' })
        .limit(20)
        .setLock('pessimistic_write')
        .setOnLocked('skip_locked')
        .getMany()

      if (!queue.length) {
        this.logger.verbose('No queue to handle')

        return
      }

      await Promise.all(
        queue.map(async queue => {
          const entry = await this.handleEntry(queue)

          return manager.save(entry)
        })
      )
    })
  }

  private async handleEntry(entry: Queue) {
    this.logger.verbose(`Handling entry ${entry.id}`)

    await firstValueFrom(
      this.httpService.post(entry.endpoint, entry.data, {
        headers: {
          authorization: `Bearer ${this.configService.get<string>(
            'API_JWT_TOKEN'
          )}`,
          'connection-id': entry.connection.id,
        },
      })
    )

    entry.status = QueueStatus.COMPLETED

    return entry
  }
}
