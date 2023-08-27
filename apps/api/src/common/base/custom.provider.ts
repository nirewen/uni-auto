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

    const injectables = ['imports', 'controllers', 'providers'].map(
      key => Reflect.getMetadata(key, this.constructor) ?? []
    )

    const provider = await this.providersService.findOne(slugify(providerName))

    for (const injectable of injectables.flat()) {
      Reflect.defineMetadata('provider', provider, injectable)
    }

    this.logger.debug(`Registered provider: ${provider.name}`)
  }
}
