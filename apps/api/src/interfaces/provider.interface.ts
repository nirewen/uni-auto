import { Inject } from '@nestjs/common'
import { PROVIDER } from 'src/base/providers/ufsm/providers/provider.service'

export abstract class ProviderInterface {
  constructor(
    @Inject(PROVIDER) public provider?: string,
    @Inject('MODULE_NAME') public name?: string
  ) {}
}
