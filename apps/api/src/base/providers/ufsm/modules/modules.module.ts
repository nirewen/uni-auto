import { Module } from '@nestjs/common'
import { AutoRUModule } from './auto_ru/auto_ru.module'
import { ModulesController } from './modules.controller'

@Module({
  imports: [AutoRUModule],
  controllers: [ModulesController],
})
export class ModulesModule {}
