import { Injectable, Logger } from '@nestjs/common'
import { ModulesService } from 'src/base/modules/modules.service'
import { RUService } from '../../utils/services/ru.service'

@Injectable()
export class AutoRUService {
  logger = new Logger('AutoRU')

  constructor(
    protected readonly modulesService: ModulesService,
    private readonly restaurantService: RUService
  ) {}

  async trigger() {
    this.logger.verbose('Triggering AutoRU')

    // const modules = await this.modulesService.findEnabled('AutoRU')

    // await Promise.all(
    //   modules.map(async module => {
    //     const settings = module.settings as UserSettings

    //     if (!module.connection || !settings) {
    //       return
    //     }

    //     return this.handleUser(module.connection, settings)
    //   })
    // )
  }
}
