import { firstValueFrom } from 'rxjs'
import { Repository } from 'typeorm'

import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue, QueueStatus } from '@uni-auto/shared/entities/queue.entity'

@Injectable()
export class QueueService {
  logger = new Logger(QueueService.name)

  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
    private readonly httpService: HttpService
  ) {}

  @Cron('0/5 * * * *')
  handleQueue() {
    this.queueRepository.manager.transaction(async (manager) => {
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

      const handled = await Promise.all(
        queue.map(async (entry) => {
          this.logger.verbose(`Handling entry ${entry.id}`)

          const result = await firstValueFrom(
            this.httpService.post(entry.endpoint, entry.data, {
              headers: {
                'connection-id': entry.connection.id,
              },
            })
          )
            .then((r) => r.data)
            .catch(async (e) => {
              this.logger.error(e.message, e.stack)

              return []
            })

          entry.status = QueueStatus.COMPLETED

          manager.save(entry)

          return {
            identifier: entry.connection.identifier,
            notifications: result,
          }
        })
      )
    })
  }
}
