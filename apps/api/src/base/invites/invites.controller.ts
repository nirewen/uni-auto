import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { InviteCode } from '@uni-auto/shared/entities/invite-code.entity'
import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser, Roles } from 'src/common/decorators'
import { LoggedIn } from 'src/common/decorators/logged-in.guard'
import { TableQueryDto } from 'src/common/dto/table-query.dto'
import { CreateInviteDto } from './dto/create-invite.dto'
import { InviteService } from './invites.service'

@Controller('invites')
@LoggedIn()
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @Get()
  getInvites(@Query() query: TableQueryDto<InviteCode>) {
    return this.inviteService.getInvites(query)
  }

  @Get('@me')
  @Roles(UserRole.USER)
  getMyInvites(
    @ReqUser() user: User,
    @Query() query: TableQueryDto<InviteCode>,
  ) {
    return this.inviteService.getMyInvites(user, query)
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
