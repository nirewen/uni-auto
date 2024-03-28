import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { InviteUse } from './invite-use.entity'
import { User } from './user.entity'

export enum InviteCodeRole {
  ACCOUNT_ACTIVATION = 'ACCOUNT_ACTIVATION',
}

@Entity({ name: 'invite_codes' })
export class InviteCode {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, default: () => 'uuid_generate_v4()' })
  code: string

  @Column({
    type: 'enum',
    enum: InviteCodeRole,
    default: InviteCodeRole.ACCOUNT_ACTIVATION,
  })
  role: InviteCodeRole

  @Column({ default: 1 })
  maxUses: number

  @Column({ default: true })
  active: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  usedAt: Date

  @ManyToOne(() => User, user => user.createdInvites, { cascade: false })
  createdBy: User

  @ManyToOne(() => User, user => user.assignedInvites, { cascade: false })
  assignedTo: User

  @ManyToOne(() => User, user => user.usableInvites, { cascade: false })
  usableBy: User

  @OneToMany(() => InviteUse, use => use.invite, { cascade: false })
  @JoinColumn()
  uses: InviteUse[]
}
