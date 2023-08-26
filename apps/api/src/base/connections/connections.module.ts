import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Connection } from 'src/entities/connection.entity'
import { ProvidersModule } from '../providers/providers.module'
import { ConnectionsService } from './connections.service'

@Module({
  imports: [TypeOrmModule.forFeature([Connection]), ProvidersModule],
  controllers: [],
  providers: [ConnectionsService],
  exports: [ConnectionsService],
})
export class ConnectionsModule {}
