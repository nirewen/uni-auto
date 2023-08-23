import { Module } from '@nestjs/common'
import { AutoRUModule } from './auto_ru/auto_ru.module'

@Module({
  imports: [AutoRUModule],
  providers: [],
})
export class ModulesModule {}
