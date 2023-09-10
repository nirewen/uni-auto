import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Connection } from 'src/entities/connection.entity'
import { User } from 'src/entities/user.entity'
import { ProvidersService } from '../providers/providers.service'
import { Payload } from './interfaces/payload.interface'
import { UpdateSettingsDTO } from './interfaces/update-settings.dto'

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

  async findConnectionByUser(id: string, user: User) {
    const connection = await this.connections.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
      relations: {
        provider: true,
        user: true,
        modules: {
          module: true,
        },
      },
    })

    if (!connection) {
      throw new BadRequestException('Invalid connection id')
    }

    return connection
  }

  async getAllConnections(user: User) {
    return this.connections.find({
      where: { user },
      relations: ['provider'],
    })
  }

  async updateSettings(
    slug: string,
    user: User,
    { connectionId, settings }: UpdateSettingsDTO
  ) {
    const connection = await this.findConnectionByUser(connectionId, user)

    const module = connection.modules.find(
      module => module.module.slug === slug
    )

    if (!module) {
      throw new BadRequestException('Invalid module')
    }

    module.settings = settings

    await this.connections.save(connection)

    return module
  }
}
