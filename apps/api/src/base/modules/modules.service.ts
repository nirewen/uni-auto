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
    private connections: ConnectionsService
  ) {}

  async enable(slug: string, data: EnableModuleDTO) {
    const module = await this.findModuleBySlug(slug)
    const connection = await this.connections.findConnection(data.connection)

    if (!module.providers.includes(connection.provider)) {
      throw new BadRequestException('Provider not supported for this module')
    }

    const settings = await this.findModuleSettings(module.id, connection.id)

    if (settings.enabled) {
      throw new BadRequestException('Module already enabled')
    }

    settings.module = module
    settings.connection = connection
    settings.enabled = true
    settings.settings = settings.settings || {}

    return this.moduleSettingsRepository.save(settings)
  }

  async disable(slug: string, data: EnableModuleDTO) {
    const module = await this.findModuleBySlug(slug)
    const connection = await this.connections.findConnection(data.connection)

    const settings = await this.findModuleSettings(module.id, connection.id)

    if (!settings.enabled) {
      throw new BadRequestException('Module already disabled')
    }

    settings.enabled = false

    return this.moduleSettingsRepository.save(settings)
  }

  async findModuleBySlug(slug: string) {
    const module = await this.moduleRepository.findOneBy({ slug })

    if (!module) {
      throw new BadRequestException('Module not found')
    }

    if (!module.enabled) {
      throw new BadRequestException('Module is temporarily disabled')
    }

    return module
  }

  async findModuleSettings(module: number, connection: string) {
    const settings = await this.moduleSettingsRepository.findOneBy({
      module: {
        id: module,
      },
      connection: {
        id: connection,
      },
    })

    if (!settings) {
      return new ModuleSettings()
    }

    return settings
  }
}
