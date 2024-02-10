import { Controller, Get } from '@nestjs/common'
import { ProvidersService } from './providers.service'

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  getProviders() {
    return this.providersService.findAll()
  }
}
