import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { APIService } from '../utils/services/api.service'

@Injectable()
export class BasicAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly apiService: APIService) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization

    if (!authorization) {
      return false
    }

    if (authorization.startsWith('Basic ')) {
      const [login, senha] = Buffer.from(
        authorization.slice('Basic '.length),
        'base64'
      )
        .toString()
        .split(':')
      const deviceId = Buffer.from(login).toString('base64')

      const { id, token } = await this.apiService.authorize(
        { login, senha },
        deviceId
      )

      request.user = { id, token, deviceId }

      return true
    }

    if (authorization.startsWith('Bearer ')) {
      return super.canActivate(context) as boolean
    }

    return false
  }
}
