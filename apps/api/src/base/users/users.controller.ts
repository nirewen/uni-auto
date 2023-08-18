import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { Payload } from 'src/auth/auth.interface'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser } from 'src/common/decorators'
import { Roles } from 'src/common/decorators/roles.decorator'
import { User, UserRole } from 'src/entities/user.entity'
import { FindOptionsWhere } from 'typeorm'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('/users')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(@Query() query: FindOptionsWhere<User>) {
    return this.userService.findAll(query)
  }

  @Post()
  create(@Body() body: CreateUserDTO) {
    return this.userService.create(body)
  }

  @Get('@me')
  @Roles(UserRole.USER)
  me(@ReqUser() payload: Payload) {
    return this.findOne(payload.id)
  }

  @Patch('@me')
  @Roles(UserRole.USER)
  edit(@ReqUser() payload: Payload, @Body() body: UpdateUserDTO) {
    return this.update(payload.id, body)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.userService.update(id, body)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
