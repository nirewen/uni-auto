import { Global, Module } from '@nestjs/common'

import { UsersModule } from './users/users.module'
import { UniversityModule } from './university/university.module'
import { ConnectionsModule } from './connections/connections.module'

@Global()
@Module({
  imports: [ConnectionsModule, UsersModule, UniversityModule],
  exports: [ConnectionsModule, UsersModule],
})
export class BaseModule {}
