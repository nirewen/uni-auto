import { Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common'

import { ModuleInterface } from 'src/interfaces/module.interface'
import {
  PROVIDER,
  ProviderInterface,
} from '../providers/ufsm/providers/provider.service'
import { ProviderRegistry } from './provider.registry'

export abstract class CustomModule implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(PROVIDER) private provider: ProviderInterface,
    private registry: ProviderRegistry,
    private module: ModuleInterface
  ) {}

  onModuleInit() {
    this.registry.registerModule(this.provider, this.module)
  }

  onModuleDestroy() {
    this.registry.removeModule(this.provider, this.module)
  }
}
