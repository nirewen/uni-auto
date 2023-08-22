import { Injectable } from '@nestjs/common'

import { MenuOptions, ScheduleOptions } from 'src/interfaces/ru.interface'

import { Credentials } from '../interfaces/credentials.interface'
import { APIService } from './api.service'

@Injectable()
export class RUService {
  constructor(private api: APIService) {}

  async schedule(options: ScheduleOptions<Credentials>) {
    return this.api.agendarRefeicao(options)
  }

  async menu(options: MenuOptions<Credentials>) {
    return this.api.getBeneficios(options)
  }
}
