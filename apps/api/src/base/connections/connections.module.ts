import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConnectionModule } from 'src/entities/connection-module.entity'
import { Connection } from 'src/entities/connection.entity'
import { ConnectionsController } from './connections.controller'
import { ConnectionsService } from './connections.service'

@Module({
  imports: [TypeOrmModule.forFeature([Connection, ConnectionModule])],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
  exports: [ConnectionsService],
})
export class ConnectionsModule {}
