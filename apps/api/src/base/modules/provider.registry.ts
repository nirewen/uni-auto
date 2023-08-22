import { Inject, Logger } from '@nestjs/common'
import { ModuleInterface } from 'src/interfaces/module.interface'
import {
  PROVIDER,
  ProviderInterface,
} from '../providers/ufsm/providers/provider.service'

export class ProviderRegistry {
  private logger = new Logger(ProviderRegistry.name)
  private providers = new Map<string, Map<string, ModuleInterface>>()

  constructor(@Inject(PROVIDER) provider: ProviderInterface) {
    this.register(provider)
  }

  register(provider: ProviderInterface) {
    this.logger.debug(`Registered provider: ${provider.name}`)

    this.providers.set(provider.slug, new Map<string, ModuleInterface>())
  }

  registerModule(provider: ProviderInterface, module: ModuleInterface) {
    this.logger.debug(
      `Registered module: ${module.constructor.name}`,
      `     for provider: ${provider.name}`
    )

    this.providers.get(provider.slug).set(module.constructor.name, module)
  }

  removeModule(provider: ProviderInterface, module: ModuleInterface) {
    this.logger.debug(`Removed module: ${module.constructor.name}`)

    this.providers.get(provider.slug).delete(module.constructor.name)
  }

  removeProvider(provider: ProviderInterface) {
    this.logger.debug(`Removed provider: ${provider}`)

    this.providers.delete(provider.name)
  }
}
