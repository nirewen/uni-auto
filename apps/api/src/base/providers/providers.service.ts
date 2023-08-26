import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Provider } from 'src/entities/provider.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider) private providers: Repository<Provider>
  ) {}

  findOneBySlug(slug: string) {
    const provider = this.providers.findOneBy({ slug })

    if (!provider) {
      throw new BadRequestException('Provider not found')
    }

    return provider
  }
}
