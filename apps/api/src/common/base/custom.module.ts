import { Inject, Logger, OnModuleInit, forwardRef } from '@nestjs/common'

import { Provider } from '@uni-auto/shared/entities/provider.entity'
import { ModulesService } from 'src/base/modules/modules.service'
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

    const injectables = ['imports', 'controllers', 'providers'].map(
      (key) => Reflect.getMetadata(key, this.constructor) ?? []
    )

    for (const injectable of injectables.flat()) {
      Reflect.defineMetadata('module', module, injectable)
      Reflect.defineMetadata('provider', provider, injectable)
    }

    this.logger.log({
      message: `Module registered: ${module.name}`,
      labels: {
        module: module.name,
        provider: provider.name,
      },
    })
  }
}
