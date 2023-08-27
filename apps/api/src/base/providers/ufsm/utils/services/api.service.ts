import { firstValueFrom } from 'rxjs'

import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { MenuOptions, ScheduleOptions } from 'src/interfaces/ru.interface'
import { CreateConnectionDTO } from '../../dto/create-connection.dto'
import { Credentials } from '../../interfaces/credentials.interface'
import { BeneficioResponse, TokenResponse } from '../../interfaces/ru.interface'

@Injectable()
export class APIService {
  constructor(private http: HttpService) {}

  private getDeviceId(login: string) {
    const base64 = Buffer.from(login).toString('base64')

    return `ufsmbot-${base64}`
  }

  async authorize(payload: CreateConnectionDTO) {
    const { data } = await firstValueFrom(
      this.http.post<TokenResponse>('/generateToken', {
        login: payload.login,
        senha: payload.senha,
        appName: 'UFSMDigital',
        deviceId: this.getDeviceId(payload.login),
        deviceInfo: '',
      })
    )

    if (data.error) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return data as {
      id: number
      token: string
    }
  }

  getHeaders(credentials: Credentials, mime: string = 'application/json') {
    return {
      'Content-Type': mime,
      'x-ufsm-access-token': credentials.token,
      'x-ufsm-device-id': this.getDeviceId(credentials.identifier),
    }
  }

  async getBeneficios(options: MenuOptions<Credentials>) {
    const { data } = await firstValueFrom(
      this.http.post<BeneficioResponse[]>(
        '/ru/getBeneficios',
        {
          idRestaurante: options.restaurant,
          dataStr: options.day,
        },
        {
          headers: this.getHeaders(
            options.credentials,
            'application/x-www-form-urlencoded'
          ),
        }
      )
    )

    if (data.some(b => b.error)) {
      throw new UnauthorizedException(
        `Invalid credentials for ${options.credentials.identifier}`
      )
    }

    return data.map(beneficio => ({
      id: beneficio.idRefeicao,
      desc: beneficio.descRefeicao,
    }))
  }

  async agendarRefeicao(options: ScheduleOptions<Credentials>) {
    const { data } = await firstValueFrom(
      this.http.post(
        '/ru/agendaRefeicoes',
        {
          idRestaurante: options.restaurant,
          dataInicio: options.day,
          dataFim: options.day,
          tiposRefeicoes: options.meals.map(m => ({
            item: m,
          })),
        },
        {
          headers: this.getHeaders(options.credentials),
        }
      )
    )
  }
}
