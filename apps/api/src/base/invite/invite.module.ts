import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InviteCode } from '@uni-auto/shared/entities/invite-code.entity'
import { UsersModule } from '../users/users.module'
import { InviteController } from './invite.controller'
import { InviteService } from './invite.service'

@Module({
  imports: [TypeOrmModule.forFeature([InviteCode]), UsersModule],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
