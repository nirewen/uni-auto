import { CRON_EXPRESSION } from 'src/common/providers/scheduling.service'

export const CronService = {
  provide: CRON_EXPRESSION,
  useValue: '*/5 * * * * *',
}
