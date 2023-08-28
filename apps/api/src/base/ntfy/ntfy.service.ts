import { HttpService } from '@nestjs/axios'
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { NtfyPayload } from './ntfy.interface'

@Injectable()
export class NtfyService {
  constructor(private readonly httpService: HttpService) {}

  async registerUser(username: string, password: string) {
    const response = await firstValueFrom(
      this.httpService.put('/v1/users', {
        username,
        password,
      })
    )
      .then(res => res.data)
      .catch(e => {
        switch (e.response.status) {
          case 409:
            throw new ConflictException('User already exists')
          default:
            throw new BadRequestException(e, 'Failed to register user')
        }
      })

    return response
  }

  async addTopic(username: string, topic: string, permission = 'ro') {
    const response = await firstValueFrom(
      this.httpService.put('/v1/users/access', {
        username,
        topic,
        permission,
      })
    )
      .then(res => res.data)
      .catch(e => {
        console.log(e)
      })

    return response
  }

  async deleteUser(username: string) {
    const response = await firstValueFrom(
      this.httpService.delete('/v1/users', {
        data: {
          username,
        },
      })
    )
      .then(res => res.data)
      .catch(e => {
        console.log(e)
      })

    return response
  }

  async publish(topic: string, payload: NtfyPayload) {
    const response = await firstValueFrom(
      this.httpService.post('', {
        topic,
        ...payload,
      })
    )
      .then(res => res.data)
      .catch(e => {
        console.log(e)
      })

    return response
  }

  async getUsers() {
    const response = await firstValueFrom(this.httpService.get('/v1/users'))
      .then(res => res.data.filter(u => u.role === 'user'))
      .catch(e => {
        console.log(e)
      })

    return response
  }
}
