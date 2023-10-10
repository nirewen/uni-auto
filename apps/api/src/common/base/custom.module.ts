import { Inject, LoggerService, OnModuleInit, forwardRef } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { ModulesService } from 'src/base/modules/modules.service'
import { Provider } from 'src/entities/provider.entity'
import { sleep } from 'src/utils/sleep'

import { slugify } from 'src/utils/slugify'

export abstract class CustomModule implements OnModuleInit {
  constructor(
    @Inject(forwardRef(() => ModulesService))
    private modulesService: ModulesService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
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
      key => Reflect.getMetadata(key, this.constructor) ?? []
    )

    for (const injectable of injectables.flat()) {
      Reflect.defineMetadata('module', module, injectable)
      Reflect.defineMetadata('provider', provider, injectable)
    }

    this.logger.log(
      `Registered module: ${module.name}\n     for provider: ${provider.name}`,
      this.constructor.name
    )
  }
}
