import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InviteCode } from '@uni-auto/shared/entities/invite-code.entity'
import { InviteUse } from '@uni-auto/shared/entities/invite-use.entity'
import { UsersModule } from '../users/users.module'
import { InviteController } from './invites.controller'
import { InviteService } from './invites.service'

@Module({
  imports: [TypeOrmModule.forFeature([InviteCode, InviteUse]), UsersModule],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
