import { Exclude } from 'class-transformer'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ConnectionModule } from './connection-module.entity'
import { ConnectionProfile } from './connection-profile.entity'
import { Provider } from './provider.entity'
import { Queue } from './queue.entity'
import { User } from './user.entity'

export enum ConnectionType {
  STANDARD = 'STANDARD',
  LEGACY = 'LEGACY',
}

@Entity({ name: 'connections' })
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Provider, provider => provider.connections)
  provider: Provider

  @ManyToOne(() => User, user => user.connections)
  user: User

  @Column()
  identifier: string

  @Column()
  @Exclude({ toPlainOnly: true })
  token: string

  @OneToMany(() => ConnectionModule, settings => settings.connection)
  modules: ConnectionModule[]

  @OneToMany(() => Queue, queue => queue.connection)
  queues: Queue[]

  @OneToOne(() => ConnectionProfile, profile => profile.connection)
  @JoinColumn()
  profile: ConnectionProfile

  @Column({
    type: 'enum',
    enum: ConnectionType,
    default: ConnectionType.STANDARD,
  })
  type: ConnectionType
}
