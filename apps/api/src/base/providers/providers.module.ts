import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Provider } from 'src/entities/provider.entity'
import { ProvidersService } from './providers.service'
import { UFSMProvider } from './ufsm/ufsm.module'

@Module({
  imports: [TypeOrmModule.forFeature([Provider]), UFSMProvider],
  controllers: [],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
