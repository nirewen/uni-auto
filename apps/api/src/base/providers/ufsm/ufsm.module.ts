import { Module } from '@nestjs/common'
import { UfsmController } from './ufsm.controller'

import { CustomProvider } from '../../../common/base/custom.provider'
import { AutoRuModule } from './modules/auto_ru/auto_ru.module'
import { UtilsModule } from './utils/utils.module'

@Module({
  imports: [UtilsModule, AutoRuModule],
  controllers: [UfsmController],
})
export class UfsmProvider extends CustomProvider {}
