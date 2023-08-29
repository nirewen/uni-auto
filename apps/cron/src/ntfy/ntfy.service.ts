import { HttpService } from '@nestjs/axios'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { NtfyPayload } from './ntfy.interface'

@Injectable()
export class NtfyService {
  constructor(private readonly httpService: HttpService) {}

  async publish(topic: string, payload: NtfyPayload) {
    const response = await firstValueFrom(
      this.httpService.post('', {
        topic,
        ...payload,
      })
    )
      .then(res => res.data)
      .catch(e => {
        switch (e.response.status) {
          case 400:
            throw new BadRequestException(e.response.data.error)
          default:
            throw new InternalServerErrorException(
              e.response.data.error,
              'Failed to publish'
            )
        }
      })

    return response
  }
}
