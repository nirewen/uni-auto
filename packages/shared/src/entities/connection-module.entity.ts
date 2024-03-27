import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Connection } from './connection.entity'
import { Module } from './module.entity'

@Entity({ name: 'connection_module' })
export class ConnectionModule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Module, module => module.connections)
  module: Module

  @ManyToOne(() => Connection, connection => connection.modules, {
    onDelete: 'CASCADE',
  })
  connection: Connection

  @Column('json')
  settings: unknown

  @Column()
  enabled: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
