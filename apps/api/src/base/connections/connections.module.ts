import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Connection } from 'src/entities/connection.entity'
import { ConnectionsService } from './connections.service'

@Module({
  imports: [TypeOrmModule.forFeature([Connection])],
  controllers: [],
  providers: [ConnectionsService],
  exports: [ConnectionsService],
})
export class ConnectionsModule {}
