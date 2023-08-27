import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'
import { ModulesService } from 'src/base/modules/modules.service'
import { ModuleService } from 'src/common/base/module.service'

export interface AutoRUSettings {
  cron: string
}

@Injectable()
export class QueueService extends ModuleService {
  job: CronJob

  constructor(
    private modulesService: ModulesService,
    private schedulerRegistry: SchedulerRegistry
  ) {
    super()
  }

  async onServiceInit() {
    const moduleSettings = await this.getSettings()

    this.job = new CronJob(moduleSettings.settings.cron, () => {
      this.enqueue()
    })

    this.job.start()

    this.schedulerRegistry.addCronJob(moduleSettings.module.slug, this.job)

    this.logger.debug(`Registered cron job: ${moduleSettings.settings.cron}`)
  }

  async getSettings() {
    return this.modulesService
      .findModuleSettings(this.module.slug, this.provider.slug)
      .then(moduleSettings => {
        const settings = moduleSettings.settings as AutoRUSettings

        return { ...moduleSettings, settings }
      })
  }

  async enqueue() {
    this.getSettings().catch(() => this.job.stop())

    console.log('Enqueueing AutoRU')
  }
}
