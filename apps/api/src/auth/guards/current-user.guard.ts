import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { User } from '@uni-auto/shared/entities/user.entity'
import { Request } from 'express'

@Injectable()
export class CurrentUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const id = request.params.id
    const user = request.user as User

    return user.id === id
  }
}
