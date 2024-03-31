import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'

import { ExtractJwt } from 'src/common/jwt/ExtractJwt'
import type { JwtPayload, Payload } from '../auth.interface'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromCookie(),
      ignoreExpiration: true,
      secretOrKey: config.get('jwt.secret'),
    })
  }

  public validate(payload: JwtPayload): Payload {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      active: payload.active,
    }
  }
}
