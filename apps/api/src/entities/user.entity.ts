import { Exclude } from 'class-transformer'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Connection } from './connection.entity'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
