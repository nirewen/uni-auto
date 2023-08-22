import { Inject, Injectable, Logger } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'

import { CronJob } from 'cron'
import {
  PROVIDER,
  ProviderInterface,
} from 'src/base/providers/ufsm/providers/provider.service'
import { ModuleInterface } from 'src/interfaces/module.interface'

export const CRON_EXPRESSION = Symbol('CRON_EXPRESSION')

@Injectable()
export class SchedulingService {
  private readonly logger = new Logger('CRON')

  constructor(
    @Inject(CRON_EXPRESSION) cronExpression: string,
    @Inject(PROVIDER) provider: ProviderInterface,
    private schedulerRegistry: SchedulerRegistry,
    private module: ModuleInterface
  ) {
    const job = new CronJob(cronExpression, () => {
      this.handleCron()
    })

    this.schedulerRegistry.addCronJob(provider.slug, job)
    job.start()

    this.logger.debug(
      `${provider.name} : ${module.constructor.name} started`,
      `${' '.repeat(provider.name.length + 3)}${cronExpression}`
    )
  }

  handleCron() {
    this.module.trigger()
  }
}
