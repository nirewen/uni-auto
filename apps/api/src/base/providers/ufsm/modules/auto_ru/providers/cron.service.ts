import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CRON_EXPRESSION } from 'src/common/providers/scheduling.service'

export const CronService = {
  provide: CRON_EXPRESSION,
  useFactory: (config: ConfigService) =>
    config.get('UFSM_AUTORU_CRON_EXPRESSION'),
  inject: [ConfigService],
} satisfies Provider
