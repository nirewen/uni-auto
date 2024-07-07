import { Global, Module } from '@nestjs/common'

import { ConnectionsModule } from './connections/connections.module'
import { InviteModule } from './invites/invites.module'
import { ModulesModule } from './modules/modules.module'
import { NtfyModule } from './ntfy/ntfy.module'
import { ProvidersModule } from './providers/providers.module'
import { StatsModule } from './stats/stats.module'
import { UsersModule } from './users/users.module'

@Global()
@Module({
  imports: [
    ConnectionsModule,
    InviteModule,
    ModulesModule,
    NtfyModule,
    ProvidersModule,
    UsersModule,
    StatsModule,
  ],
  exports: [ConnectionsModule, ModulesModule, UsersModule],
})
export class BaseModule {}
