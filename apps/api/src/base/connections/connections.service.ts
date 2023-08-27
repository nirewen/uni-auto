import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Connection } from 'src/entities/connection.entity'
import { User } from 'src/entities/user.entity'
import { ProvidersService } from '../providers/providers.service'
import { Payload } from './interfaces/payload.interface'

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection) private connections: Repository<Connection>,
    private providersService: ProvidersService
  ) {}

  async connect(data: Payload, user: User) {
    const provider = await this.providersService.findOne(data.provider)
    let connection = await this.connections.findOne({
      where: {
        provider,
        identifier: data.identifier,
      },
    })

    if (!connection) {
      connection = new Connection()
    }

    connection.provider = provider
    connection.identifier = data.identifier
    connection.token = data.token

    connection.user = user

    return this.connections.save(connection)
  }

  async findConnection(id: string) {
    const connection = await this.connections.findOne({
      where: { id },
      relations: ['provider', 'user'],
    })

    if (!connection) {
      throw new BadRequestException('Invalid connection id')
    }

    return connection
  }
}
