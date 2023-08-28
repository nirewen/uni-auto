import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
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
        console.log(e)
      })

    return response
  }
}
