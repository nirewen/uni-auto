import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'

import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { NtfyService } from '../ntfy/ntfy.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private ntfy: NtfyService
  ) {}

  async count() {
    return this.users.count()
  }

  async countByRole(role: UserRole) {
    return this.users.count({
      where: { role },
    })
  }

  async findAll(filter: FindOptionsWhere<User>) {
    return this.users.find({
      where: filter,
      relations: {
        connections: true,
      },
    })
  }

  async findOne(email: string) {
    const user = await this.users.findOne({
      where: { email },
      relations: {
        connections: true,
      },
    })

    return user || this.users.create({ email })
  }

  async findOneById(id: string) {
    const user = await this.users.findOne({
      where: { id },
      relations: {
        connections: true,
      },
    })

    if (!user) {
      throw new NotFoundException('user with provided id was not found')
    }

    return user
  }

  async update(user: User) {
    return this.users.save(user)
  }

  async remove(id: string) {
    const user = await this.findOneById(id)

    return this.users.remove(user)
  }
}
