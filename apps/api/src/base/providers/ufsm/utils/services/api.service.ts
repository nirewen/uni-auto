import { firstValueFrom } from 'rxjs'

import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import type { AxiosRequestConfig } from 'axios'

import { ConfigService } from '@nestjs/config'
import {
  AllowancesOptions,
  GroupedMeal,
  MenuOptions,
  ScheduleResponse,
} from 'src/interfaces/ru.interface'
import { CreateConnectionDTO } from '../../dto/create-connection.dto'
import {
  APIResponse,
  BeneficioResponse,
  TokenResponse,
} from '../../interfaces/ru.interface'

import { ConnectionProfile } from '@uni-auto/shared/entities/connection-profile.entity'
import { ConnectionType } from '@uni-auto/shared/entities/connection.entity'
import { User } from '@uni-auto/shared/entities/user.entity'
import { format, parseISO } from 'date-fns'
import { ProviderProfileOptions } from 'src/base/providers/providers.service'
import { Carteira } from '../../dto/carteira.dto'
import { Credentials } from '../../interfaces/credentials.interface'

@Injectable()
export class APIService {
  private deviceIdPrefix: string
  constructor(
    private http: HttpService,
    config: ConfigService,
  ) {
    this.deviceIdPrefix = config.get<string>('ufsm.deviceIdPrefix')
  }

  private getDeviceId(credentials: Credentials) {
    if (credentials.type === ConnectionType.LEGACY) {
      const base64 = Buffer.from(credentials.identifier).toString('base64')

      return `${this.deviceIdPrefix}${base64}`
    }

    return `${this.deviceIdPrefix}${credentials.user.id}`
  }

  private async fetch<T>(
    url: string,
    data = {},
    config: AxiosRequestConfig<any> = {},
  ) {
    const result = await firstValueFrom(
      this.http.post<APIResponse<T>>(url, data, config),
    )

    if (
      result.data &&
      ((Array.isArray(result.data) && result.data.some(r => r.error)) ||
        (result.data as APIResponse<T>).error)
    ) {
      throw new BadRequestException(
        (Array.isArray(result.data)
          ? (result.data as Array<APIResponse<T>>)
              .map(r => r.mensagem)
              .join('\n')
          : (result.data as APIResponse<T>).mensagem) ?? 'Unknown error',
      )
    }

    return result
  }

  getHeaders(credentials: Credentials, mime: string = 'application/json') {
    return {
      'Content-Type': mime,
      'x-ufsm-access-token': credentials.token,
      'x-ufsm-device-id': this.getDeviceId(credentials),
    }
  }

  async authorize(payload: CreateConnectionDTO, user: User) {
    const { data } = await this.fetch<TokenResponse>('/generateToken', {
      login: payload.login,
      senha: payload.senha,
      appName: 'UFSMDigital',
      deviceId: this.getDeviceId({
        identifier: payload.login,
        type: ConnectionType.STANDARD,
        user,
      } as unknown as Credentials),
      deviceInfo: '',
    })

    if (data.error) {
      throw new BadRequestException('Invalid credentials')
    }

    return {
      identifier: payload.login,
      token: data.token,
      user: { id: user.id },
    } as Credentials
  }

  async getBeneficios(options: AllowancesOptions, credentials: Credentials) {
    const { data } = await this.fetch<BeneficioResponse[]>(
      '/ru/getBeneficios',
      {
        idRestaurante: options.restaurant,
        dataStr: options.day,
      },
      {
        headers: this.getHeaders(
          credentials,
          'application/x-www-form-urlencoded',
        ),
      },
    )

    return data.map(beneficio => ({
      id: beneficio.idRefeicao,
      desc: beneficio.descRefeicao,
    }))
  }

  async agendarRefeicao(options: GroupedMeal, credentials: Credentials) {
    const data = await this.fetch<ScheduleResponse[]>(
      '/ru/agendaRefeicoes',
      {
        idRestaurante: options.restaurant,
        dataInicio: options.dateStart,
        dataFim: options.dateEnd,
        tiposRefeicoes: options.meals.map(m => ({
          item: m,
        })),
        opcaoVegetariana: options.vegan,
      },
      { headers: this.getHeaders(credentials) },
    )
      .then(r => r.data)
      .then(r => {
        if (r.some(i => i.error)) {
          Logger.error({
            message: `Ocorreu um erro ao agendar refeições para ${credentials.identifier}`,
            options,
            response: r,
          })

          throw new BadRequestException(
            r
              .filter(i => i.error)
              .map(i => i.mensagem)
              .join('\n'),
          )
        }
        return r
      })

    return data
  }

  async getCardapio(options: MenuOptions, credentials: Credentials) {
    const { data } = await this.fetch(
      '/ru/cardapio',
      {},
      {
        params: {
          dataInicioStr: format(parseISO(options.dateStart), 'dd/MM/YYYY'),
          dataFimStr: format(parseISO(options.dateEnd), 'dd/MM/yyyy'),
        },
        headers: this.getHeaders(credentials),
      },
    )

    return data
  }

  async getProfile(credentials: Credentials, options: ProviderProfileOptions) {
    const profile = new ConnectionProfile()

    const { data } = await this.fetch<{ nome: string; fotoBase64: string }>(
      '/vinculos',
      {},
      {
        params: { buscaFoto: !options.minimal },
        headers: this.getHeaders(credentials),
      },
    )

    profile.displayName = data.nome
    profile.avatarUrl = 'data:image/png;base64,' + data.fotoBase64

    return profile
  }

  async getCarteira(credentials: Credentials) {
    const { data } = await this.fetch<Carteira>(
      '/buscaCarteira',
      {},
      {
        headers: this.getHeaders(credentials),
      },
    )

    return data
  }
}
