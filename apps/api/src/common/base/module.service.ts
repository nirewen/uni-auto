import { Logger } from '@nestjs/common'
import { Module } from 'src/entities/module.entity'
import { Provider } from 'src/entities/provider.entity'
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

  private async getModule(): Promise<Module> {
    const module = Reflect.getMetadata('module', this.constructor)

    if (!module) {
      await sleep(1000)

      return this.getModule()
    }

    return module as Module
  }

  private async getProvider(): Promise<Provider> {
    const provider = Reflect.getMetadata('provider', this.constructor)

    if (!provider) {
      await sleep(1000)

      return this.getProvider()
    }

    return provider as Provider
  }

  abstract onServiceInit(): void | Promise<void>
}
