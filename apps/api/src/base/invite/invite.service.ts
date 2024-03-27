import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  InviteCode,
  InviteCodeRole,
} from '@uni-auto/shared/entities/invite-code.entity'
import { User } from '@uni-auto/shared/entities/user.entity'
import { OkResponse } from 'src/common/filters/ok.exception'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { CreateInviteDto } from './dto/create-invite.dto'

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(InviteCode)
    private inviteRepository: Repository<InviteCode>,
    private usersService: UsersService,
  ) {}

  getInvites() {
    return this.inviteRepository.find({
      relations: ['createdBy', 'usedBy', 'usableBy'],
    })
  }

  async useInvite(reqUser: User, code: string) {
    const user = await this.usersService.findOneById(reqUser.id)
    const invite = (await this.inviteRepository
      .findOne({
        where: { code },
        relations: ['createdBy', 'usedBy', 'usableBy'],
      })
      .catch(e => null)) as InviteCode

    if (!invite) {
      throw new BadRequestException('Invalid invite code')
    }

    if (!invite.active) {
      throw new BadRequestException('Invite code is no longer active')
    }

    if (invite.usedBy) {
      throw new BadRequestException('Invite code has already been used')
    }

    if (invite.usableBy && invite.usableBy.id !== user.id) {
      throw new BadRequestException('Invite code is not usable by this user')
    }

    invite.usedBy = user
    invite.usedAt = new Date()
    invite.active = false

    await this.inviteRepository.save(invite)
    await this.inviteActionRole(user, invite)

    return new OkResponse('Invite code used successfully')
  }

  async inviteActionRole(user: User, invite: InviteCode) {
    switch (invite.role) {
      case InviteCodeRole.ACCOUNT_ACTIVATION: {
        user.active = true

        await this.usersService.update(user)

        break
      }
      default: {
        throw new BadRequestException(
          'Invalid invite code role - Role action not implemented',
        )
      }
    }
  }

  async createInvite(dto: CreateInviteDto) {
    const user = await this.usersService.findOneById(dto.createdBy)
    const usableBy = await this.usersService.findOneById(dto.usableBy)
    const assignedTo = await this.usersService.findOneById(dto.assignedTo)

    const invite = this.inviteRepository.create({
      active: dto.active,
      createdBy: user,
      usableBy,
      assignedTo: assignedTo ?? user,
    })

    return this.inviteRepository.save(invite)
  }
}
