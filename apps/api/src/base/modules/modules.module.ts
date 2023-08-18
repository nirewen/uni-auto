import { ModulesService } from './modules.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModulesController } from './modules.controller'
import { Module } from '@nestjs/common'

import { Module as ModuleEntity } from 'src/entities/module.entity'
import { ModuleSettings } from 'src/entities/module-settings.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity, ModuleSettings])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
