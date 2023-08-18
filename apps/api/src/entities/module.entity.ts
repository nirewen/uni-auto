import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ModuleSettings } from './module-settings.entity'

@Entity({ name: 'modules' })
export class Module {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  slug: string

  @OneToMany(() => ModuleSettings, settings => settings.module)
  settings: ModuleSettings[]

  @Column()
  enabled: boolean
}
