import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Module } from './module.entity'
import { Provider } from './provider.entity'

@Entity({ name: 'module_settings' })
export class ModuleSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Module, module => module.settings)
  module: Module

  @ManyToOne(() => Provider, provider => provider.modules)
  provider: Provider

  @Column('json')
  settings: unknown

  @Column()
  enabled: boolean
}
