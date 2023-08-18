import { firstValueFrom } from 'rxjs'

import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

import { Credentials } from '../interfaces/credentials.interface'

@Injectable()
export class APIService {
  constructor(private http: HttpService) {}

  getHeaders(credentials: Credentials) {
    return {
      'Content-Type': 'application/json',
      'x-ufsm-access-token': credentials.accessToken,
      'x-ufsm-device-id': credentials.deviceId,
    }
  }

  async getBeneficios(day: string, credentials: Credentials): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.post('/ru/getBeneficios', {
        headers: this.getHeaders(credentials),
        data: {
          // todo: Send form data
        },
      })
    )

    return data as number[]
  }

  async agendarRefeicao(options: {
    day: string
    meals: { item: number }[]
    restaurant: number
    credentials: Credentials
  }): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.post('/ru/agendarRefeicao', {
        headers: this.getHeaders(options.credentials),
        data: {
          // todo: Send form data
        },
      })
    )

    return data as number[]
  }
}
