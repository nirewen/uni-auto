import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { JwtPayload, JwtSign, Payload } from './auth.interface'

import { UsersService } from 'src/base/users/users.service'
import { User } from 'src/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private users: UsersService,
    private config: ConfigService
  ) {}

  public async validateUser(
    username: string,
    password: string
  ): Promise<Partial<User> | null> {
    const user = await this.users.findOne(username)

    if (!user) {
      return null
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (checkPassword) {
      const { password, ...result } = user

      return result
    }

    return null
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
      username: data.username,
      role: data.role,
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
      }
    )
  }
}
