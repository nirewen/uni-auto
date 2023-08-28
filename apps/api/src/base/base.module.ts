import { Global, Module } from '@nestjs/common'

import { ConnectionsModule } from './connections/connections.module'
import { ModulesModule } from './modules/modules.module'
import { NtfyModule } from './ntfy/ntfy.module'
import { ProvidersModule } from './providers/providers.module'
import { UsersModule } from './users/users.module'

@Global()
@Module({
  imports: [
    ConnectionsModule,
    ModulesModule,
    NtfyModule,
    UsersModule,
    ProvidersModule,
  ],
  exports: [ConnectionsModule, ModulesModule, UsersModule],
})
export class BaseModule {}
