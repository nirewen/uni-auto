import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection } from '@uni-auto/shared/entities/connection.entity'
import { Provider } from '@uni-auto/shared/entities/provider.entity'
import { Repository } from 'typeorm'
import { APIService as UFSMAPIService } from './ufsm/utils/services/api.service'

export type ProviderProfileOptions = {
  minimal: boolean
}

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

  getProviderProfile(connection: Connection, options: ProviderProfileOptions = { minimal: false }) {
    switch (connection.provider.slug) {
      case 'ufsm':
        return this.ufsmApiService.getProfile(connection, options)
      default:
        return null
    }
  }
}
