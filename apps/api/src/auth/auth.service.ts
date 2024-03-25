import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { JwtPayload, JwtSign, Payload } from './auth.interface'

import { User } from '@uni-auto/shared/entities/user.entity'
import { UsersService } from 'src/base/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private users: UsersService,
    private config: ConfigService,
  ) {}

  public async validateUser(
    details: Pick<User, 'email' | 'displayName' | 'provider' | 'avatarUrl'>,
  ): Promise<Partial<User> | null> {
    const user = await this.users.findOne(details.email)

    user.provider = details.provider
    user.displayName = details.displayName
    user.avatarUrl = details.avatarUrl

    return this.users.update(user)
  }

  public validateToken(token: string): JwtPayload {
    if (
      !this.jwt.verify(token, {
        secret: this.config.get('jwt.secret'),
      })
    ) {
      return
    }

    return this.jwt.decode(token) as JwtPayload
  }

  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (
      !this.jwt.verify(refreshToken, {
        secret: this.config.get('jwt.refreshSecret'),
      })
    ) {
      return false
    }

    const payload = this.jwt.decode(refreshToken) as { sub: string }
    return payload.sub === data.id
  }

  public jwtSign(data: Payload): JwtSign {
    const payload: JwtPayload = {
      sub: data.id,
      email: data.email,
      role: data.role,
      active: data.active,
    }

    return {
      access_token: this.jwt.sign(payload),
      refresh_token: this.getRefreshToken(payload.sub),
    }
  }

  private getRefreshToken(sub: string): string {
    return this.jwt.sign(
      { sub },
      {
        secret: this.config.get('jwt.refreshSecret'),
        expiresIn: '7d', // must be > access_token.expiresIn
      },
    )
  }
}
