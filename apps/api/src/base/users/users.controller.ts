import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { Payload } from 'src/auth/auth.interface'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser } from 'src/common/decorators'
import { LoggedIn } from 'src/common/decorators/logged-in.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { FindOptionsWhere } from 'typeorm'
import { UsersService } from './users.service'

@Controller('/users')
@LoggedIn()
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(
    @Query('query') filter: FindOptionsWhere<User>,
    @Query('pagination') pagination: { page: number; limit: number },
    @Query('sorting') sorting: { id: string; desc: string },
  ) {
    return this.userService.findAll({ pagination, filter, sorting })
  }

  @Get('@me')
  @Roles(UserRole.USER)
  me(@ReqUser() payload: Payload) {
    return this.findOne(payload.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
