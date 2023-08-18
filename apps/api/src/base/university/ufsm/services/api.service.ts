import { firstValueFrom } from 'rxjs'

import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { Credentials } from '../interfaces/credentials.interface'
import { CreateConnectionDTO } from '../dto/create-connection.dto'
import { MenuOptions, ScheduleOptions } from 'src/interfaces/ru.interface'

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

  async getBeneficios(options: MenuOptions<Credentials>) {
    const { data } = await firstValueFrom(
      this.http.post('/ru/getBeneficios', {
        headers: this.getHeaders(
          options.credentials,
          'application/x-www-form-urlencoded'
        ),
        data: {
          idRestaurante: options.restaurant,
          dataStr: options.day,
        },
      })
    )

    return data as {
      idRefeicao: number
      descRefeicao: string
    }[]
  }

  async agendarRefeicao(options: ScheduleOptions<Credentials>): Promise<any> {
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
