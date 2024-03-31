import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'

import { JwtPayload, Payload } from '../auth.interface'

import { ExtractJwt } from 'src/common/jwt/ExtractJwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromCookie(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.secret'),
    })
  }

  validate(payload: JwtPayload): Payload {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      active: payload.active,
    }
  }
}
