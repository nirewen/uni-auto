import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Connection } from 'src/entities/connection.entity'
import { Payload } from './interfaces/payload.interface'
import { User } from 'src/entities/user.entity'

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection) private connections: Repository<Connection>
  ) {}

  async connect(data: Payload) {
    const connection = new Connection()

    connection.provider = data.provider
    connection.identifier = data.identifier
    connection.token = data.token

    connection.user = new User()
    connection.user.id = data.userId

    return this.connections.save(connection)
  }
}
