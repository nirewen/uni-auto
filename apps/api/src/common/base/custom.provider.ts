import { Inject, Logger, forwardRef } from '@nestjs/common'
import { ProvidersService } from '../../base/providers/providers.service'

import { slugify } from 'src/utils/slugify'

export class CustomProvider {
  private logger = new Logger(this.constructor.name)

  constructor(
    @Inject(forwardRef(() => ProvidersService))
    private providersService: ProvidersService
  ) {
    this.loadProvider()
  }

  async loadProvider() {
    const providerName = this.constructor.name.replace('Provider', '')

    const modules = Reflect.getMetadata('imports', this.constructor)

    const provider = await this.providersService.findOne(slugify(providerName))

    for (const module of modules) {
      Reflect.defineMetadata('provider', provider, module)
    }

    this.logger.debug(`Registered provider: ${provider.name}`)
  }
}
