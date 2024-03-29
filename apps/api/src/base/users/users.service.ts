import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'

import { ConfigService } from '@nestjs/config'
import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private config: ConfigService,
  ) {}

  async count() {
    return this.users.count()
  }

  async countByRole(role: UserRole) {
    return this.users.count({
      where: { role },
    })
  }

  create(user: User) {
    return this.users.create(user)
  }

  async findAll({
    pagination,
    filter,
    sorting,
  }: {
    pagination: IPaginationOptions
    filter: FindOptionsWhere<User>
    sorting: { id: string; desc: string }
  }) {
    return paginate(this.users, pagination, {
      where: filter,
      relations: {
        connections: true,
      },
      order: {
        [sorting.id]: sorting.desc === 'true' ? 'DESC' : 'ASC',
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

    return (
      user ||
      this.users.create({
        email,
        active: this.config.get('inviteOnly') ? false : true,
      })
    )
  }

  async findOneById(id: string) {
    if (!id) {
      return null
    }

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
