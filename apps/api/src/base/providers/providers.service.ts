import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Provider } from 'src/entities/provider.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>
  ) {}

  async findOne(slug: string) {
    return this.providersRepository.findOneBy({ slug })
  }
}
