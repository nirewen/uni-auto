import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { firstValueFrom } from 'rxjs'
import { Queue, QueueStatus } from 'src/entities/queue.entity'
import { NtfyPayload } from 'src/ntfy/ntfy.interface'
import { NtfyService } from 'src/ntfy/ntfy.service'
import { Repository } from 'typeorm'

@Injectable()
export class QueueService {
  logger = new Logger(QueueService.name)

  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
    private readonly httpService: HttpService,
    private readonly ntfy: NtfyService
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

      const handled = await Promise.all(
        queue.map(async entry => {
          this.logger.verbose(`Handling entry ${entry.id}`)

          const result = await firstValueFrom(
            this.httpService.post<NtfyPayload[]>(entry.endpoint, entry.data, {
              headers: {
                'connection-id': entry.connection.id,
              },
            })
          )

          entry.status = QueueStatus.COMPLETED

          manager.save(entry)

          return {
            identifier: entry.connection.identifier,
            notifications: result.data,
          }
        })
      )

      for (const notification of handled) {
        await Promise.all(
          notification.notifications.map(async ntfy =>
            this.ntfy.publish(notification.identifier, ntfy)
          )
        )
      }
    })
  }
}
