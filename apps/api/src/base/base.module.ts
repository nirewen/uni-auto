import { Global, Module } from '@nestjs/common'

import { UsersModule } from './users/users.module'
import { UniversityModule } from './university/university.module'

@Global()
@Module({
  imports: [UsersModule, UniversityModule],
  exports: [UsersModule],
})
export class BaseModule {}
