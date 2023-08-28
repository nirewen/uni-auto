import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { FindOptionsWhere, Repository } from 'typeorm'

import { User, UserRole } from 'src/entities/user.entity'
import { NtfyService } from '../ntfy/ntfy.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'

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

  // TODO: use afterInsert to hash the password afterwards
  private hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }

  async create(user: CreateUserDTO) {
    const password = await this.hashPassword(user.password)

    const newUser = this.users.create({ ...user, password })

    await this.ntfy.registerUser(user.username, user.password)

    return this.users.save(newUser)
  }

  async findAll(filter: FindOptionsWhere<User>) {
    return this.users.find({
      where: filter,
      relations: {
        connections: true,
      },
    })
  }

  async findOne(username: string) {
    const user = await this.users.findOne({
      where: { username },
      relations: {
        connections: true,
      },
    })

    if (!user) {
      throw new NotFoundException('user with provided username was not found')
    }

    return user
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

  async update(id: string, body: UpdateUserDTO) {
    const user = await this.findOneById(id)

    const ntfyUser = await this.ntfy
      .getUsers()
      .then(users => users.find(u => u.username === user.username))

    if (ntfyUser) {
      if (body.password && body.password !== user.password) {
        await this.ntfy.publish(user.username, {
          title: 'Senha alterada',
          message:
            'Sua senha foi alterada, por favor faça login novamente no ' +
            'Ntfy para continuar recebendo as notificações.',
          priority: 5,
        })

        await this.ntfy.deleteUser(user.username)
        await this.ntfy.registerUser(user.username, body.password)

        for (const grant of ntfyUser.grants) {
          await this.ntfy.addTopic(user.username, grant.topic)
        }
      }
    }

    if (body.password && body.password !== user.password) {
      body.password = await this.hashPassword(body.password)
    } else {
      body.password = user.password
    }

    return this.users.save({ ...user, ...body })
  }

  async remove(id: string) {
    const user = await this.findOneById(id)

    return this.users.remove(user)
  }
}
