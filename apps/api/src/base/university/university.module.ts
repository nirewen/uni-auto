import { Module } from '@nestjs/common'
import { UFSMModule } from './ufsm/ufsm.module'

@Module({
  imports: [UFSMModule],
  controllers: [],
  providers: [],
})
export class UniversityModule {}
