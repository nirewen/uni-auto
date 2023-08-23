import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModulesController } from './modules.controller'
import { ModulesService } from './modules.service'

import { ModuleSettings } from 'src/entities/module-settings.entity'
import { Module as ModuleEntity } from 'src/entities/module.entity'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity, ModuleSettings])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
