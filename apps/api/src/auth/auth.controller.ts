import {
  Body,
  Controller,
  Headers,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'

import { CreateUserDTO } from 'src/base/users/dto/create-user.dto'
import { UsersService } from 'src/base/users/users.service'
import { Public, ReqUser } from 'src/common/decorators'
import { User } from 'src/entities/user.entity'
import { Payload } from './auth.interface'
import { AuthService } from './auth.service'
import { DuplicateUserGuard, JwtRefreshGuard, LocalAuthGuard } from './guards'

@Controller('/auth')
export class AuthController {
  constructor(private auth: AuthService, private users: UsersService) {}

  @Public()
  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  public signin(@Res() res: Response, @ReqUser() user: User) {
    const tokens = this.auth.jwtSign(user)

    res.json(tokens)
  }

  @Public()
  @Post('/signup')
  @UseGuards(DuplicateUserGuard)
  public async signup(@Res() res: Response, @Body() newUser: CreateUserDTO) {
    const user = await this.users.create(newUser)

    this.signin(res, user)
  }

  @Public()
  @Post('/refresh')
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(
    @Res() res: Response,
    @ReqUser() payload: Payload,
    @Headers('refresh_token') token: string
  ) {
    if (!token || !this.auth.validateRefreshToken(payload, token)) {
      throw new UnauthorizedException('InvalidRefreshToken')
    }

    const user = await this.users.findOneById(payload.id)

    this.signin(res, user)
  }
}
