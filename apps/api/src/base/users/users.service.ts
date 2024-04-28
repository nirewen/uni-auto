import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ConfigService } from '@nestjs/config'
import { User, UserRole } from '@uni-auto/shared/entities/user.entity'
import { paginate } from 'nestjs-typeorm-paginate'
import { TableQueryDto } from 'src/common/dto/table-query.dto'
import {
  filterToWhere,
  paginationToPaging,
  sortToOrder,
} from 'src/utils/table.util'

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

  isAllowedDomain(email: string) {
    return this.config
      .get('auth.google.allowedDomains')
      .some((domain: string) => email.endsWith(domain))
  }

  async findAll({ pagination, filter, sorting }: TableQueryDto<User>) {
    const filterableFields = ['email', 'displayName']

    return paginate(this.users, paginationToPaging(pagination), {
      where: filterToWhere(filter, filterableFields),
      relations: {
        connections: true,
      },
      order: sortToOrder(sorting),
    })
  }

  async findOne(email: string) {
    const user = await this.users.findOne({
      where: { email },
      relations: {
        connections: true,
      },
    })

    if (!user && !this.isAllowedDomain(email)) {
      throw new BadRequestException(
        'email domain is not allowed',
        'Esse domínio de email não é permitido. Utilize um email institucional de uma universidade suportada.',
      )
    }

    return (
      user ||
      this.users.create({
        email,
        active: !this.config.get('inviteOnly'),
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
