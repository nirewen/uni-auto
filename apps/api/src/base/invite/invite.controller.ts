import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser, Roles } from 'src/common/decorators'
import { LoggedIn } from 'src/common/decorators/logged-in.guard'
import { CreateInviteDto } from './dto/create-invite.dto'
import { InviteService } from './invite.service'

@Controller('invite')
@LoggedIn()
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @Get()
  getInvites() {
    return this.inviteService.getInvites()
  }

  @Post()
  createInvite(
    @ReqUser() user: User,
    @Body() createInviteDto: CreateInviteDto,
  ) {
    if (!createInviteDto.createdBy) {
      createInviteDto.createdBy = user.id
    }

    return this.inviteService.createInvite(createInviteDto)
  }

  @Post('/use/:code')
  @Roles(UserRole.USER)
  useInvite(@ReqUser() user: User, @Param('code') code: string) {
    return this.inviteService.useInvite(user, code)
  }
}
