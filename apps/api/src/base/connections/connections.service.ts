import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Jimp from 'jimp'
import { Repository } from 'typeorm'

import { ConnectionModule } from '@uni-auto/shared/entities/connection-module.entity'
import { ConnectionProfile } from '@uni-auto/shared/entities/connection-profile.entity'
import {
  Connection,
  ConnectionType,
} from '@uni-auto/shared/entities/connection.entity'
import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { differenceInCalendarDays } from 'date-fns'
import { paginate } from 'nestjs-typeorm-paginate'
import { TableQueryDto } from 'src/common/dto/table-query.dto'
import {
  filterToWhere,
  paginationToPaging,
  sortToOrder,
} from 'src/utils/table.util'
import { ProvidersService } from '../providers/providers.service'
import { AvatarQueryDto } from './interfaces/avatar-query.dto'
import { Payload } from './interfaces/payload.interface'
import { UpdateSettingsDTO } from './interfaces/update-settings.dto'

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection) private connections: Repository<Connection>,
    @InjectRepository(ConnectionModule)
    private connectionModule: Repository<ConnectionModule>,
    @InjectRepository(ConnectionProfile)
    private connectionProfiles: Repository<ConnectionProfile>,
    private providersService: ProvidersService,
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
    connection.user = { id: user.id } as User
    connection.type = ConnectionType.STANDARD

    return this.connections.save(connection)
  }

  async findConnection(id: string) {
    const connection = await this.connections.findOne({
      where: { id },
      relations: ['provider', 'user', 'profile', 'profile.connection'],
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

  async getAll({ pagination, filter, sorting }: TableQueryDto<Connection>) {
    const filterableFields = [
      'user_displayName',
      'profile_displayName',
      'provider_name',
    ]

    return paginate(this.connections, paginationToPaging(pagination), {
      where: filterToWhere(filter, filterableFields),
      relations: {
        provider: true,
        user: true,
        profile: true,
      },
      order: sortToOrder(sorting),
    })
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
    { connectionId, settings }: UpdateSettingsDTO,
  ) {
    const connectionModule = await this.findConnectionSettings(
      user,
      connectionId,
      slug,
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

  async getProfile(user: User, id: string, forced: boolean = false) {
    const connection = await this.findConnection(id)
    const profile = connection.profile ?? this.connectionProfiles.create()

    if (connection.user.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Invalid connection id')
    }

    if (
      (connection.user.id === user.id &&
        differenceInCalendarDays(profile.updatedAt ?? 0, new Date()) < 0) ||
      (forced && user.role === UserRole.ADMIN)
    ) {
      let result = await this.providersService.getProviderProfile(connection)

      if (result) {
        profile.displayName = result.displayName
        profile.avatarUrl = result.avatarUrl
        profile.updatedAt = new Date()
        profile.connection = this.connections.create({
          id: connection.id,
          identifier: connection.identifier,
        })

        connection.profile = await this.connectionProfiles.save(profile)

        await this.connections.save(connection)
      }
    }

    return profile
  }

  async getProfileAvatar(
    user: User,
    id: string,
    { forced, size, raw }: AvatarQueryDto,
  ) {
    const profile = await this.getProfile(user, id, forced)

    size = isNaN(size) ? 256 : size

    const [, data] = profile.avatarUrl.split('data:image/png;base64,')
    const img = Buffer.from(data, 'base64')

    if (raw) {
      return img
    }

    const avatar = await Jimp.read(img)
    avatar.cover(size, size)

    return avatar.getBufferAsync(Jimp.MIME_PNG)
  }

  async getHealth(user: User, id: string) {
    const connection = await this.findConnection(id)

    if (connection.user.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Invalid connection id')
    }

    try {
      await this.providersService.getProviderProfile(connection, {
        minimal: true,
      })

      return { status: 'OK' }
    } catch (e) {
      return { status: 'ERROR' }
    }
  }
}
