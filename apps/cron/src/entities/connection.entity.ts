import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ConnectionModule } from './connection-module.entity'
import { Provider } from './provider.entity'
import { Queue } from './queue.entity'
import { User } from './user.entity'

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
  token: string

  @OneToMany(() => ConnectionModule, settings => settings.connection)
  modules: ConnectionModule[]

  @OneToMany(() => Queue, queue => queue.connection)
  queues: Queue[]
}
