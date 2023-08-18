import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { User } from './user.entity'
import { Module } from './module.entity'
import { ModuleSettings } from './module-settings.entity'

@Entity()
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider: string

  @ManyToOne(() => User, user => user.connections)
  user: User

  @Column()
  identifier: string

  @Column()
  token: string

  @OneToMany(() => ModuleSettings, settings => settings.connection)
  modules: ModuleSettings[]
}
