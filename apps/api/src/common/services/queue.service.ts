import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection } from '@uni-auto/shared/entities/connection.entity'
import { Queue } from '@uni-auto/shared/entities/queue.entity'
import { Repository } from 'typeorm'

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>
  ) {}

  async enqueue<T>(data: T, connection: Connection, endpoint: string) {
    const queue = new Queue()

    queue.data = data
    queue.endpoint = endpoint
    queue.connection = connection

    return this.queueRepository.save(queue)
  }
}
