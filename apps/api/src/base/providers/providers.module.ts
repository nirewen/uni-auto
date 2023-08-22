import { Module } from '@nestjs/common'
import { UFSMProvider } from './ufsm/ufsm.module'

@Module({
  imports: [UFSMProvider],
  controllers: [],
  providers: [],
})
export class ProvidersModule {}
