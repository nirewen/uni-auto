import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { UserRole } from '@uni-auto/shared/entities/user.entity'
import { Roles } from 'src/common/decorators'
import { AddTopicDTO } from './dto/add-topic.dto'
import { CreateUserDTO } from './dto/create-user.dto'
import { NtfyPayload } from './ntfy.interface'
import { NtfyService } from './ntfy.service'

@Controller('ntfy')
@Roles(UserRole.ADMIN)
export class NtfyController {
  constructor(private readonly ntfyService: NtfyService) {}

  @Post('register')
  async registerUser(@Body() body: CreateUserDTO) {
    return this.ntfyService.registerUser(body.username, body.password)
  }

  @Get('users')
  async getUsers() {
    return this.ntfyService.getUsers()
  }

  @Post('users/:username')
  async addTopic(
    @Param('username') username: string,
    @Body() body: AddTopicDTO
  ) {
    return this.ntfyService.addTopic(username, body.topic)
  }

  @Delete('users/:username')
  async deleteUser(@Param('username') username: string) {
    return this.ntfyService.deleteUser(username)
  }

  @Post(':topic')
  async publish(@Param('topic') topic: string, @Body() body: NtfyPayload) {
    return this.ntfyService.publish(topic, body)
  }
}
