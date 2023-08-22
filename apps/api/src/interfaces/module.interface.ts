import { Inject } from '@nestjs/common'
import { ModulesService } from 'src/base/modules/modules.service'
import { PROVIDER } from 'src/base/providers/ufsm/providers/provider.service'

export abstract class ModuleInterface {
  constructor(
    @Inject(PROVIDER) public provider?: string,
    protected readonly modulesService?: ModulesService
  ) {}

  abstract trigger(): Promise<any>
}
