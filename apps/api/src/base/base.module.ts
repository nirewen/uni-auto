import { Global, Module } from '@nestjs/common'

import { UsersModule } from './users/users.module'
import { UniversityModule } from './university/university.module'
import { ConnectionsModule } from './connections/connections.module'
import { ModulesModule } from './modules/modules.module'

@Global()
@Module({
  imports: [ConnectionsModule, ModulesModule, UsersModule, UniversityModule],
  exports: [ConnectionsModule, ModulesModule, UsersModule],
})
export class BaseModule {}
