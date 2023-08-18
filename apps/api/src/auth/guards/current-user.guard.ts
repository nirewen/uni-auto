import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { User } from 'src/entities/user.entity'

@Injectable()
export class CurrentUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const id = request.params.id
    const user = request.user as User

    return user.id === id
  }
}
