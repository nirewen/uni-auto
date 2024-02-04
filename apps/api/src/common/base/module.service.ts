import { Logger } from '@nestjs/common'
import { Module } from '@uni-auto/shared/entities/module.entity'
import { Provider } from '@uni-auto/shared/entities/provider.entity'
import { sleep } from 'src/utils/sleep'

export abstract class ModuleService {
  protected logger: Logger
  protected module: Module
  protected provider: Provider

  constructor() {
    Promise.all([this.getModule(), this.getProvider()]).then(
      ([module, provider]) => {
        this.module = module
        this.provider = provider

        this.logger = new Logger(`${provider.name} / ${module.name}`)

        this.onServiceInit()
      }
    )
  }

  private async getModule(tries = 0): Promise<Module> {
    const module = Reflect.getMetadata('module', this.constructor)

    if (!module) {
      if (tries > 3) {
        return
      }

      await sleep(1000)

      return this.getModule(tries + 1)
    }

    return module as Module
  }

  private async getProvider(tries = 0): Promise<Provider> {
    const provider = Reflect.getMetadata('provider', this.constructor)

    if (!provider) {
      if (tries > 3) {
        return
      }

      await sleep(1000)

      return this.getProvider(tries + 1)
    }

    return provider as Provider
  }

  abstract onServiceInit(): void | Promise<void>
}
