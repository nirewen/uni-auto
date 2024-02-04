import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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
  modules: ModuleSettings[]

  @OneToMany(() => Connection, connection => connection.provider)
  connections: Connection[]
}
