import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Provider } from '@uni-auto/shared/entities/provider.entity'
import { UserRole } from '@uni-auto/shared/entities/user.entity'
import { ConnectionsService } from 'src/base/connections/connections.service'

@Injectable()
export class ConnectionHeaderGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly connectionsService: ConnectionsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const connectionId = request.headers['connection-id']
    const authorization = request.headers.authorization

    if (authorization?.startsWith('Basic ')) {
      return true
    }

    if (!connectionId) {
      throw new BadRequestException('Missing connection id')
    }

    const connection = await this.connectionsService.findConnection(
      connectionId
    )

    if (
      connection.user.id !== request.user.id &&
      connection.user.role !== UserRole.ADMIN &&
      connection.provider.slug !==
        this.reflector.get<Provider>('provider', context.getClass()).slug
    ) {
      throw new BadRequestException('Invalid connection id')
    }

    request.user = connection

    return true
  }
}
