import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ConnectionModule } from '@uni-auto/shared/entities/connection-module.entity'
import { Connection } from '@uni-auto/shared/entities/connection.entity'
import { User } from '@uni-auto/shared/entities/user.entity'
import { ProvidersService } from '../providers/providers.service'
import { Payload } from './interfaces/payload.interface'
import { UpdateSettingsDTO } from './interfaces/update-settings.dto'

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection) private connections: Repository<Connection>,
    @InjectRepository(ConnectionModule)
    private connectionModule: Repository<ConnectionModule>,
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

  async findConnectionSettings(user: User, id: string, slug: string) {
    const settings = await this.connectionModule.findOne({
      where: {
        connection: { id, user: { id: user.id } },
        module: { slug },
      },
      relations: {
        connection: {
          user: true,
        },
      },
    })

    if (!settings) {
      throw new BadRequestException('Invalid connection id')
    }

    return settings
  }

  async getAllConnections(user: User) {
    return this.connections.find({
      where: { user },
      relations: ['provider'],
    })
  }

  async updateSettings(
    user: User,
    slug: string,
    { connectionId, settings }: UpdateSettingsDTO
  ) {
    const connectionModule = await this.findConnectionSettings(
      user,
      connectionId,
      slug
    )

    if (connectionModule.connection.user.id !== user.id) {
      throw new BadRequestException('Invalid connection id')
    }

    if (!connectionModule) {
      throw new BadRequestException('Invalid module')
    }

    connectionModule.settings = settings

    await this.connectionModule.save(connectionModule)

    return connectionModule
  }

  async deleteConnection(user: User, id: string) {
    const connection = await this.findConnection(id)

    if (connection.user.id !== user.id) {
      throw new BadRequestException('Invalid connection id')
    }

    return this.connections.remove(connection)
  }
}
