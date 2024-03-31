import {
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { User } from '@uni-auto/shared/entities/user.entity'
import { Response } from 'express'
import { UsersService } from 'src/base/users/users.service'
import { Cookies, Public, ReqUser } from 'src/common/decorators'
import { JwtSign, Payload } from './auth.interface'
import { AuthService } from './auth.service'
import { JwtRefreshGuard } from './guards'
import { GoogleAuthGuard } from './guards/google-auth.guard'

@Controller('/auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private users: UsersService,
    private config: ConfigService,
  ) {}

  private writeCookies(res: Response, tokens: JwtSign) {
    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: true,
    })
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
    })
  }

  @Public()
  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  public handleGoogleLogin() {}

  @Public()
  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  public handleGoogleRedirect(@Res() res: Response, @ReqUser() user: User) {
    const tokens = this.auth.jwtSign(user)

    this.writeCookies(res, tokens)

    res.redirect(this.config.get('api.frontendUrl'))
  }

  @Public()
  @Post('/refresh')
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(
    @Res() res: Response,
    @ReqUser() payload: Payload,
    @Cookies('refresh_token') token: string,
  ) {
    if (!token || !this.auth.validateRefreshToken(payload, token)) {
      throw new UnauthorizedException('InvalidRefreshToken')
    }

    const user = await this.users.findOneById(payload.id)

    const tokens = this.auth.jwtSign(user)

    this.writeCookies(res, tokens)

    res.json(user)
  }

  @Public()
  @Post('/logout')
  public async logout(@Res() res: Response) {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')

    res.json({ message: 'Logged out' })
  }
}
