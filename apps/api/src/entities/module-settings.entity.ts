import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Module } from './module.entity'
import { Connection } from './connection.entity'

@Entity({ name: 'module_settings' })
export class ModuleSettings {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Module, module => module.settings)
  module: Module

  @ManyToOne(() => Connection, connection => connection.modules)
  connection: Connection

  @Column('json')
  settings: unknown

  @Column()
  enabled: boolean
}
