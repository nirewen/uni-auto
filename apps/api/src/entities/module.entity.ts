import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm'
import { ModuleSettings } from './module-settings.entity'

@Entity({ name: 'modules' })
export class Module {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  @Index({ unique: true })
  slug: string

  @OneToMany(() => ModuleSettings, settings => settings.module)
  settings: ModuleSettings[]

  @Column('text', { array: true, nullable: true, default: [] })
  providers: string[]

  @Column()
  enabled: boolean
}
