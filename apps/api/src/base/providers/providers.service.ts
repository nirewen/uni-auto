import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection } from 'src/entities/connection.entity'
import { Provider } from 'src/entities/provider.entity'
import { Repository } from 'typeorm'
import { APIService as UFSMAPIService } from './ufsm/utils/services/api.service'

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>,
    private ufsmApiService: UFSMAPIService
  ) {}

  async findOne(slug: string) {
    return this.providersRepository.findOneBy({ slug })
  }

  async findAll() {
    return this.providersRepository.find()
  }

  async getProfile(connection: Connection) {
    if (connection.provider.slug === 'ufsm') {
      return this.ufsmApiService.getProfile(connection)
    }

    return null
  }
}
