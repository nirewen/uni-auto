import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModulesController } from './modules.controller'
import { ModulesService } from './modules.service'

import { ConnectionModule } from 'src/entities/connection-module.entity'
import { Module as ModuleEntity } from 'src/entities/module.entity'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity, ConnectionModule])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
