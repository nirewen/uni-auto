import { firstValueFrom } from 'rxjs'

import { HttpService } from '@nestjs/axios'
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

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
import { Credentials } from '../../interfaces/credentials.interface'
import { BeneficioResponse, TokenResponse } from '../../interfaces/ru.interface'

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

  private getDeviceId(login: string) {
    const base64 = Buffer.from(login).toString('base64')

    return `${this.deviceIdPrefix}${base64}`
  }

  async authorize(payload: CreateConnectionDTO, deviceId?: string) {
    const { data } = await firstValueFrom(
      this.http.post<TokenResponse>('/generateToken', {
        login: payload.login,
        senha: payload.senha,
        appName: 'UFSMDigital',
        deviceId: deviceId ?? this.getDeviceId(payload.login),
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
      'x-ufsm-device-id':
        credentials.deviceId ?? this.getDeviceId(credentials.identifier),
    }
  }

  async getBeneficios(options: AllowancesOptions, credentials: Credentials) {
    const { data } = await firstValueFrom(
      this.http.post<BeneficioResponse[]>(
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
    )

    if (data.some((b) => b.error)) {
      throw new UnauthorizedException(
        `Invalid credentials for ${credentials.identifier}`
      )
    }

    return data.map((beneficio) => ({
      id: beneficio.idRefeicao,
      desc: beneficio.descRefeicao,
    }))
  }

  async agendarRefeicao(options: GroupedMeal, credentials: Credentials) {
    const data = await firstValueFrom(
      this.http.post<ScheduleResponse[]>(
        '/ru/agendaRefeicoes',
        {
          idRestaurante: options.restaurant,
          dataInicio: options.dateStart,
          dataFim: options.dateEnd,
          tiposRefeicoes: options.meals.map((m) => ({
            item: m,
          })),
          opcaoVegetariana: options.vegan,
        },
        {
          headers: this.getHeaders(credentials),
        }
      )
    )
      .then((r) => r.data)
      .then((r) => {
        if (r.some((i) => i.error)) {
          throw new BadRequestException(
            r
              .filter((i) => i.error)
              .map((i) => i.mensagem)
              .join('\n')
          )
        }
        return r
      })

    const notifications = this.responseToNtfyPayloads(data)

    await Promise.all(
      notifications.map(async (notification) =>
        this.ntfy.publish(credentials.identifier, notification)
      )
    )

    return data
  }

  async getCardapio(options: MenuOptions, credentials: Credentials) {
    const { data } = await firstValueFrom(
      this.http.post(
        '/ru/cardapio',
        {},
        {
          params: {
            dataInicioStr: dayjs(options.dateStart).format('DD/MM/YYYY'),
            dataFimStr: dayjs(options.dateEnd).format('DD/MM/YYYY'),
          },
          headers: this.getHeaders(credentials),
        }
      )
    )

    return data
  }

  async getProfile(credentials: Credentials) {
    const { data } = await firstValueFrom(
      this.http.post(
        '/vinculos',
        {},
        {
          params: {
            buscaFoto: true,
          },
          headers: this.getHeaders(credentials),
        }
      )
    )

    return {
      provider: 'ufsm',
      identifier: credentials.identifier,
      displayName: data.nome,
      avatarUrl: 'data:image/png;base64,' + data.fotoBase64,
    }
  }

  private responseToNtfyPayloads(response: ScheduleResponse[]) {
    type Item = {
      dates: string[]
      meals: string[]
      message: string
      success: boolean
    }

    const isEqual = (a: string[], b: string[]) =>
      a.every((item) => b.includes(item)) && b.every((item) => a.includes(item))

    return response
      .reduce((acc, item) => {
        const newItem: Item = {
          dates: [item.dataRefAgendada],
          meals: [item.tipoRefeicao],
          message: item.impedimento,
          success: item.sucesso,
        }

        let found = acc.find(
          (i) =>
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
          (i) =>
            isEqual(item.meals, i.meals) &&
            !isEqual(item.dates, i.dates) &&
            dayjs(item.dates.at(-1)).diff(i.dates.at(-1), 'days') === 1 &&
            item.message === i.message
        )

        if (found) {
          found.dates.push(...item.dates)

          return acc
        }

        return [...acc, item]
      }, [] as Item[])
      .map((item) => {
        const joining = item.dates.length > 2 ? ' até ' : ' e '
        let message = ''

        item.meals.sort(
          (a, b) =>
            Object.values(mealNames).indexOf(a) -
            Object.values(mealNames).indexOf(b)
        )
        const dates = [item.dates.shift(), item.dates.pop()]
          .filter(Boolean)
          .map((d) => dayjs(d).format('ddd DD/MM'))

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
