import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ModuleSettings } from 'src/entities/module-settings.entity'

import { Module } from 'src/entities/module.entity'
import { Repository } from 'typeorm'
import { EnableModuleDTO } from './dto/enable-module.dto'
import { ConnectionsService } from '../connections/connections.service'

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
    @InjectRepository(ModuleSettings)
    private readonly moduleSettingsRepository: Repository<ModuleSettings>,
    private connectionsService: ConnectionsService
  ) {}

  async enable(data: EnableModuleDTO) {
    const module = await this.findModuleBySlug(data.module)
    const connection = await this.connectionsService.findConnection(
      data.connection
    )

    if (!module.providers.includes(connection.provider)) {
      throw new BadRequestException('Provider not supported for this module')
    }

    let settings = await this.moduleSettingsRepository.findOneBy({
      module: {
        id: module.id,
      },
      connection: {
        id: connection.id,
      },
    })

    if (settings) {
      throw new BadRequestException('Module already enabled')
    }

    settings = new ModuleSettings()

    settings.module = module
    settings.connection = connection
    settings.enabled = true
    settings.settings = {}

    return this.moduleSettingsRepository.save(settings)
  }

  async findModuleBySlug(slug: string) {
    const module = await this.moduleRepository.findOneBy({ slug })

    if (!module) {
      throw new BadRequestException('Module not found')
    }

    return module
  }
}
