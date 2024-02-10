import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConnectionModule } from '@uni-auto/shared/entities/connection-module.entity'
import { ConnectionProfile } from '@uni-auto/shared/entities/connection-profile.entity'
import { Connection } from '@uni-auto/shared/entities/connection.entity'
import { ConnectionsController } from './connections.controller'
import { ConnectionsService } from './connections.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Connection, ConnectionModule, ConnectionProfile]),
  ],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
  exports: [ConnectionsService],
})
export class ConnectionsModule {}
