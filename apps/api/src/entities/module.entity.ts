import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ConnectionModule } from './connection-module.entity'
import { ModuleSettings } from './module-settings.entity'

@Entity({ name: 'modules' })
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  @Index({ unique: true })
  slug: string

  @OneToMany(() => ConnectionModule, settings => settings.module)
  connections: ConnectionModule[]

  @OneToMany(() => ModuleSettings, settings => settings.module)
  providers: ModuleSettings[]

  @Column()
  enabled: boolean
}
