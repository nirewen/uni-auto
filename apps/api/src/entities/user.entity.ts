import { Exclude } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

import { Connection } from './connection.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string

  @OneToMany(() => Connection, connection => connection.user)
  connections: Connection[]
}
