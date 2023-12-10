import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
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
  email: string

  @Column({ unique: true })
  displayName: string

  @Column({ nullable: true })
  provider: string

  @Column({ nullable: true })
  avatarUrl: string

  @OneToMany(() => Connection, (connection) => connection.user)
  connections: Connection[]

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
