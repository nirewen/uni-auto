import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@uni-auto/shared/entities/user.entity'
import { IS_PUBLIC_KEY } from 'src/common/decorators'
import { IS_LOGGED_IN } from 'src/common/decorators/logged-in.guard'
import { UpgradeRequiredException } from 'src/common/filters/upgrade-required.exception'

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    const isLoggedIn = this.reflector.getAllAndOverride<boolean>(IS_LOGGED_IN, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic || isLoggedIn) {
      return true
    }

    const req = context.switchToHttp().getRequest()

    const user: User = req.user

    if (!user) {
      throw new InternalServerErrorException('Cannot verify user authorization')
    }

    if (!user.active) {
      throw new UpgradeRequiredException('Your account is not active')
    }

    return true
  }
}
