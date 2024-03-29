import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  InviteCode,
  InviteCodeRole,
} from '@uni-auto/shared/entities/invite-code.entity'
import { InviteUse } from '@uni-auto/shared/entities/invite-use.entity'
import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { paginate } from 'nestjs-typeorm-paginate'
import { TableQueryDto } from 'src/common/dto/table-query.dto'
import { OkResponse } from 'src/common/filters/ok.exception'
import { filterToWhere, sortToOrder } from 'src/utils/table.util'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { CreateInviteDto } from './dto/create-invite.dto'

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(InviteCode)
    private inviteRepository: Repository<InviteCode>,
    @InjectRepository(InviteUse)
    private inviteUseRepository: Repository<InviteUse>,
    private usersService: UsersService,
  ) {}

  getInvites({ filter, pagination, sorting }: TableQueryDto<InviteCode>) {
    const filterableFields = [
      'code',
      'role',
      'uses_usedBy_displayName',
      'usableBy_displayName',
      'assignedTo_displayName',
      'active',
    ]

    return paginate(this.inviteRepository, pagination, {
      where: filterToWhere(filter, filterableFields),
      relations: ['createdBy', 'uses.usedBy', 'usableBy', 'assignedTo'],
      order: sortToOrder(sorting),
    })
  }

  validateInvite(user: User, invite: InviteCode) {
    if (!invite) {
      throw new BadRequestException('Invalid invite code')
    }

    if (!invite.active) {
      throw new BadRequestException('Invite code is no longer active')
    }

    if (invite.usableBy && invite.usableBy.id !== user.id) {
      throw new BadRequestException('Invite code is not usable by this user')
    }

    if (invite.uses.length === invite.maxUses && invite.maxUses > 0) {
      throw new BadRequestException('Invite code has no more uses')
    }

    if (invite.uses.find(use => use.usedBy.id === user.id)) {
      throw new BadRequestException('Invite code already used by this user')
    }
  }

  async useInvite(reqUser: User, code: string) {
    const user = await this.usersService.findOneById(reqUser.id)
    const invite = (await this.inviteRepository
      .findOne({
        where: { code },
        relations: ['createdBy', 'uses.usedBy', 'usableBy'],
      })
      .catch(e => {
        console.log(e)
        return null
      })) as InviteCode

    this.validateInvite(user, invite)

    const use = this.inviteUseRepository.create({
      invite,
      usedBy: user,
    })

    invite.uses.push(use)

    await this.inviteUseRepository.save(use)

    if (invite.maxUses > 0) {
      invite.active = invite.uses.length < invite.maxUses
    }

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
        throw new BadRequestException('Invite Code Role action not implemented')
      }
    }
  }

  async createInvite(dto: CreateInviteDto) {
    const user = await this.usersService.findOneById(dto.createdBy)
    const usableBy = await this.usersService.findOneById(dto.usableBy)
    const assignedTo = await this.usersService.findOneById(dto.assignedTo)

    if (dto.maxUses < 1 && user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Invalid max uses value')
    }

    const invite = this.inviteRepository.create({
      code: dto.code,
      role: dto.role,
      maxUses: dto.maxUses,
      active: dto.active,
      createdBy: user,
      usableBy,
      assignedTo: assignedTo ?? user,
    })

    return this.inviteRepository.save(invite)
  }
}
