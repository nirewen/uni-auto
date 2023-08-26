import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Connection } from './connection.entity'
import { ModuleSettings } from './module-settings.entity'

@Entity({ name: 'providers' })
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  slug: string

  @Column()
  enabled: boolean

  @OneToMany(() => ModuleSettings, settings => settings.provider)
  settings: ModuleSettings[]

  @ManyToOne(() => Connection, connection => connection.provider)
  connections: Connection[]
}
