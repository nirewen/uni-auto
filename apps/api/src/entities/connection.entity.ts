import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './user.entity'

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
}
