import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConnectionModule } from 'src/entities/connection-module.entity'

import { ModuleSettings } from 'src/entities/module-settings.entity'
import { Module } from 'src/entities/module.entity'
import { Repository } from 'typeorm'
import { ConnectionsService } from '../connections/connections.service'
import { EnableModuleDTO } from './dto/enable-module.dto'

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
    @InjectRepository(ModuleSettings)
    private readonly moduleSettingsRepository: Repository<ModuleSettings>,
    @InjectRepository(ConnectionModule)
    private readonly connectionModuleRepository: Repository<ConnectionModule>,
    private connections: ConnectionsService
  ) {}

  public async findEnabled(module: string) {
    return this.connectionModuleRepository.find({
      where: {
        enabled: true,
        connection: {
          // provider: {
          //   slug: this.provider.slug,
          // },
        },
        module: {
          slug: module,
        },
      },
      relations: ['connection'],
    })
  }

  async enable(slug: string, data: EnableModuleDTO) {
    const module = await this.findModuleBySlug(slug)
    const connection = await this.connections.findConnection(data.connection)

    if (!module.settings.find(s => s.provider.id === connection.provider.id)) {
      throw new BadRequestException('Provider not supported for this module')
    }

    const settings = await this.findConnectionModule(module.id, connection.id)

    if (settings.enabled) {
      throw new BadRequestException('Module already enabled')
    }

    settings.module = module
    settings.connection = connection
    settings.enabled = true
    settings.settings = settings.settings || {}

    return this.connectionModuleRepository.save(settings)
  }

  async disable(slug: string, data: EnableModuleDTO) {
    const module = await this.findModuleBySlug(slug)
    const connection = await this.connections.findConnection(data.connection)

    const settings = await this.findConnectionModule(module.slug, connection.id)

    if (!settings.enabled) {
      throw new BadRequestException('Module already disabled')
    }

    settings.enabled = false

    return this.connectionModuleRepository.save(settings)
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

  async findConnectionModule(module: string, connection: string) {
    const settings = await this.connectionModuleRepository.findOneBy({
      module: {
        slug: module,
      },
      connection: {
        id: connection,
      },
    })

    if (!settings) {
      return new ConnectionModule()
    }

    return settings
  }

  async findModuleByName(name: string) {
    const module = await this.moduleRepository.findOne({
      where: { name },
      relations: {
        settings: true,
      },
    })

    if (!module) {
      throw new BadRequestException('Module not found')
    }

    if (!module.enabled) {
      throw new BadRequestException('Module is temporarily disabled')
    }

    return module
  }

  async findModuleSettings(module: string, provider: string) {
    const settings = await this.moduleSettingsRepository.findOne({
      where: {
        module: {
          slug: module,
        },
        provider: {
          slug: provider,
        },
      },
      relations: {
        provider: true,
        module: true,
      },
    })

    if (!settings) {
      throw new BadRequestException('Settings not found')
    }

    if (!settings.module.enabled) {
      throw new BadRequestException('Module is temporarily disabled')
    }

    if (!settings.provider.enabled) {
      throw new BadRequestException('Provider is temporarily disabled')
    }

    if (!settings.enabled) {
      throw new BadRequestException(
        'Module is temporarily disabled for this provider'
      )
    }

    return settings
  }
}
