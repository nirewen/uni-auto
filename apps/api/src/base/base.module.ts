import { Module } from '@nestjs/common'
import { UniversityModule } from './university/university.module'

@Module({
  imports: [UniversityModule],
  controllers: [],
  providers: [],
})
export class BaseModule {}
