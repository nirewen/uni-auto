import { firstValueFrom } from 'rxjs'

import { HttpService } from '@nestjs/axios'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import type { AxiosRequestConfig } from 'axios'

import { ConfigService } from '@nestjs/config'
import { NtfyService } from 'src/base/ntfy/ntfy.service'
import {
  AllowancesOptions,
  GroupedMeal,
  MenuOptions,
  ScheduleResponse,
} from 'src/interfaces/ru.interface'
import { formatList, mealNames, p } from 'src/utils/mappings'
import { CreateConnectionDTO } from '../../dto/create-connection.dto'
import {
  APIResponse,
  BeneficioResponse,
  TokenResponse,
} from '../../interfaces/ru.interface'

import { ConnectionProfile } from '@uni-auto/shared/entities/connection-profile.entity'
import { ConnectionType } from '@uni-auto/shared/entities/connection.entity'
import { User } from '@uni-auto/shared/entities/user.entity'
import { differenceInDays, format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ProviderProfileOptions } from 'src/base/providers/providers.service'
import { Carteira } from '../../dto/carteira.dto'
import { Credentials } from '../../interfaces/credentials.interface'

@Injectable()
export class APIService {
  private deviceIdPrefix: string
  constructor(
    private http: HttpService,
    private ntfy: NtfyService,
    config: ConfigService
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
    config: AxiosRequestConfig<any> = {}
  ) {
    const result = await firstValueFrom(
      this.http.post<APIResponse<T>>(url, data, config)
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
          : (result.data as APIResponse<T>).mensagem) ?? 'Unknown error'
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
          'application/x-www-form-urlencoded'
        ),
      }
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
      { headers: this.getHeaders(credentials) }
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
              .join('\n')
          )
        }
        return r
      })

    const notifications = this.responseToNtfyPayloads(data)

    Logger.log({
      identifier: credentials.identifier,
      notifications,
    })

    await Promise.all(
      notifications.map(async notification =>
        this.ntfy.publish(credentials.identifier, notification)
      )
    )

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
      }
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
      }
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
      }
    )

    return data
  }

  private responseToNtfyPayloads(response: ScheduleResponse[]) {
    type Item = {
      dates: string[]
      meals: string[]
      message: string
      success: boolean
    }

    const isEqual = (a: string[], b: string[]) =>
      a.every(item => b.includes(item)) && b.every(item => a.includes(item))

    return response
      .reduce((acc, item) => {
        const newItem: Item = {
          dates: [item.dataRefAgendada],
          meals: [item.tipoRefeicao],
          message: item.impedimento,
          success: item.sucesso,
        }

        let found = acc.find(
          i =>
            i.dates.includes(item.dataRefAgendada) &&
            i.message === item.impedimento
        )

        if (found) {
          found.dates = [...new Set([...found.dates, item.dataRefAgendada])]
          found.meals = [...new Set([...found.meals, item.tipoRefeicao])]

          return acc
        }

        return [...acc, newItem]
      }, [] as Item[])
      .reduce((acc, item) => {
        const found = acc.find(
          i =>
            isEqual(item.meals, i.meals) &&
            !isEqual(item.dates, i.dates) &&
            differenceInDays(
              parseISO(item.dates.at(-1)),
              parseISO(i.dates.at(-1))
            ) === 1 &&
            item.message === i.message
        )

        if (found) {
          found.dates.push(...item.dates)

          return acc
        }

        return [...acc, item]
      }, [] as Item[])
      .map(item => {
        const joining = item.dates.length > 2 ? ' até ' : ' e '
        let message = ''

        item.meals.sort(
          (a, b) =>
            Object.values(mealNames).indexOf(a) -
            Object.values(mealNames).indexOf(b)
        )
        const dates = [item.dates.shift(), item.dates.pop()]
          .filter(Boolean)
          .map(d => format(parseISO(d), 'EEEE dd/MM'), { locale: ptBR })

        if (item.success) {
          message = `${formatList(item.meals)} agendado${p(
            item.meals.length
          )} para ${dates.join(joining)}`
        } else {
          message = `${formatList(item.meals)} para ${dates.join(joining)}:\n${
            item.message
          }`
        }

        return {
          title: item.success ? 'RU agendado' : 'Falha ao agendar',
          message,
          priority: item.success ? 2 : 5,
          tags: [item.success ? 'shallow_pan_of_food' : 'warning'],
        }
      })
  }
}
