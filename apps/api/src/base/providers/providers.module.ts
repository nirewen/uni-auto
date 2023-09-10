import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Provider } from 'src/entities/provider.entity'
import { ProvidersController } from './providers.controller'
import { ProvidersService } from './providers.service'
import { UfsmProvider } from './ufsm/ufsm.module'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Provider]), UfsmProvider],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
