import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModulesController } from './modules.controller'
import { ModulesService } from './modules.service'

import { ConnectionModule } from '@uni-auto/shared/entities/connection-module.entity'
import { ModuleSettings } from '@uni-auto/shared/entities/module-settings.entity'
import { Module as ModuleEntity } from '@uni-auto/shared/entities/module.entity'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ModuleEntity, ConnectionModule, ModuleSettings]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
