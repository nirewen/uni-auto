import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Connection } from './connection.entity'
import { InviteCode } from './invite-code.entity'
import { InviteUse } from './invite-use.entity'

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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole

  @Column({ default: true })
  active: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Connection, connection => connection.user)
  connections: Connection[]

  @OneToMany(() => InviteUse, use => use.usedBy)
  usedInvites: InviteUse[]

  @OneToMany(() => InviteCode, invite => invite.createdBy)
  createdInvites: InviteCode[]

  @OneToMany(() => InviteCode, invite => invite.assignedTo)
  assignedInvites: InviteCode[]

  @OneToMany(() => InviteCode, invite => invite.usableBy)
  usableInvites: InviteCode[]
}
