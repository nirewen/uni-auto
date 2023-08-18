import { firstValueFrom } from 'rxjs'

import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { Credentials } from '../interfaces/credentials.interface'
import { CreateConnectionDTO } from '../dto/create-connection.dto'

@Injectable()
export class APIService {
  constructor(private http: HttpService) {}

  private getDeviceId(login: string) {
    const base64 = Buffer.from(login).toString('base64')

    return `ufsmbot-${base64}`
  }

  async authorize(payload: CreateConnectionDTO) {
    const { data } = await firstValueFrom(
      this.http.post('/generateToken', {
        login: payload.login,
        senha: payload.senha,
        appName: 'UFSMDigital',
        deviceId: this.getDeviceId(payload.login),
        deviceInfo: '',
      })
    )

    if (data.error) {
      throw new UnauthorizedException(data)
    }

    return data as {
      id: number
      token: string
    }
  }

  getHeaders(credentials: Credentials, mime: string = 'application/json') {
    return {
      'Content-Type': mime,
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
