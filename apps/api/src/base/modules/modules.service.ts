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

  public async findEnabled(provider: string, module: string) {
    return this.connectionModuleRepository.find({
      where: {
        enabled: true,
        connection: {
          provider: {
            slug: provider,
          },
        },
        module: {
          slug: module,
        },
      },
      relations: ['connection'],
    })
  }

  async deleteModule(slug: string, data: EnableModuleDTO) {
    const connection = await this.connections.findConnection(data.connection)

    const moduleSettings = await this.findModuleSettings(
      slug,
      connection.provider.slug
    )

    if (!moduleSettings.enabled) {
      throw new BadRequestException('Module is temporarily disabled')
    }

    const settings = await this.findConnectionModule(
      moduleSettings.module.id,
      connection.id
    )

    return this.connectionModuleRepository.remove(settings)
  }

  async toggle(slug: string, data: EnableModuleDTO) {
    const connection = await this.connections.findConnection(data.connection)

    const moduleSettings = await this.findModuleSettings(
      slug,
      connection.provider.slug
    )

    if (!moduleSettings.enabled) {
      throw new BadRequestException('Module is temporarily disabled')
    }

    const settings = await this.findConnectionModule(
      moduleSettings.module.id,
      connection.id
    )

    settings.module = moduleSettings.module
    settings.connection = connection
    settings.enabled = data.enabled ?? true
    settings.settings = settings.settings || {}

    return this.connectionModuleRepository.save(settings)
  }

  async toggleModule(slug: string, data: EnableModuleDTO) {
    const module = await this.findModuleBySlug(slug)

    if (module.enabled === data.enabled) {
      throw new BadRequestException('Module already enabled')
    }

    module.enabled = data.enabled

    return this.moduleRepository.save(module)
  }

  async findModuleBySlug(slug: string) {
    const module = await this.moduleRepository.findOne({
      where: { slug },
      relations: ['settings'],
    })

    if (!module) {
      throw new BadRequestException('Module not found')
    }

    return module
  }

  async findConnectionModule(module: string, connection: string) {
    const settings = await this.connectionModuleRepository.findOneBy({
      module: {
        id: module,
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
      relations: ['settings'],
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
      relations: ['module', 'provider'],
    })

    return settings
  }

  async getModules(provider: string) {
    return this.moduleSettingsRepository
      .find({
        where: {
          enabled: true,
          provider: {
            slug: provider,
          },
        },
        relations: ['module'],
      })
      .then(settings => settings.map(setting => setting.module))
  }
}
