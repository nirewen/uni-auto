import { Inject, Injectable, Logger } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'

import { CronJob } from 'cron'

import { RestaurantInterface } from 'src/interfaces/ru.interface'

export const CRON_EXPRESSION = Symbol('CRON_EXPRESSION')

@Injectable()
export class SchedulingService {
  private readonly logger = new Logger('CRON')

  constructor(
    @Inject(CRON_EXPRESSION) cronExpression: string,
    @Inject('UNIVERSITY') name: string,
    private schedulerRegistry: SchedulerRegistry,
    private restaurantService: RestaurantInterface
  ) {
    const job = new CronJob(cronExpression, () => {
      this.handleCron()
    })

    this.schedulerRegistry.addCronJob(name, job)
    job.start()

    this.logger.warn(`Cron ${name} started with expression ${cronExpression}`)
  }

  handleCron() {
    this.restaurantService.handleCron()
  }
}
