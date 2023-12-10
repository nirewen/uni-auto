import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'

import { Response } from 'express'
import { UsersService } from 'src/base/users/users.service'
import { Public, ReqUser } from 'src/common/decorators'
import { User } from 'src/entities/user.entity'
import { Payload } from './auth.interface'
import { AuthService } from './auth.service'
import { JwtRefreshGuard } from './guards'
import { GoogleAuthGuard } from './guards/google-auth.guard'

@Controller('/auth')
export class AuthController {
  constructor(private auth: AuthService, private users: UsersService) {}

  @Public()
  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  public handleGoogleLogin() {}

  @Public()
  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  public handleGoogleRedirect(@Res() res: Response, @ReqUser() user: User) {
    const tokens = this.auth.jwtSign(user)

    const url = new URL(process.env.FRONTEND_URL)
    url.pathname = '/auth/callback'
    url.search = new URLSearchParams({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    }).toString()

    res.redirect(url.toString())
  }

  @Public()
  @Post('/refresh')
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(
    @Res() res: Response,
    @ReqUser() payload: Payload,
    @Body('refresh_token') token: string
  ) {
    if (!token || !this.auth.validateRefreshToken(payload, token)) {
      throw new UnauthorizedException('InvalidRefreshToken')
    }

    const user = await this.users.findOneById(payload.id)

    const tokens = this.auth.jwtSign(user)

    res.json({ user, tokens })
  }
}
