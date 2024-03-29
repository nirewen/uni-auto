import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { Payload } from 'src/auth/auth.interface'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser } from 'src/common/decorators'
import { LoggedIn } from 'src/common/decorators/logged-in.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { SortingOptions } from 'src/common/filters/data-table.filter'
import { UsersService } from './users.service'

@Controller('/users')
@LoggedIn()
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(
    @Query('query') filter: string,
    @Query('pagination')
    pagination: IPaginationOptions = { page: 1, limit: 10 },
    @Query('sorting')
    sorting: SortingOptions<User> = { id: 'createdAt', desc: 'false' },
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
