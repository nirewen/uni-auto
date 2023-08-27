import { Inject, Logger, OnModuleInit, forwardRef } from '@nestjs/common'

import { ModulesService } from 'src/base/modules/modules.service'
import { Provider } from 'src/entities/provider.entity'
import { sleep } from 'src/utils/sleep'

import { slugify } from 'src/utils/slugify'

export abstract class CustomModule implements OnModuleInit {
  private logger = new Logger(this.constructor.name)

  constructor(
    @Inject(forwardRef(() => ModulesService))
    private modulesService: ModulesService
  ) {}

  async getProvider() {
    const provider = Reflect.getMetadata('provider', this.constructor)

    if (!provider) {
      await sleep(1000)

      return this.getProvider()
    }

    return provider as Provider
  }

  async onModuleInit() {
    const provider = await this.getProvider()
    const moduleName = slugify(this.constructor.name.replace('Module', ''))

    const module = await this.modulesService.findModuleBySlug(moduleName)

    const providers = Reflect.getMetadata('providers', this.constructor)

    for (const service of providers) {
      Reflect.defineMetadata('module', module, service)
      Reflect.defineMetadata('provider', provider, service)
    }

    this.logger.debug(
      `Registered module: ${module.name}`,
      `     for provider: ${provider.name}`
    )
  }
}
