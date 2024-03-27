import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
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

  @OneToOne(() => User, user => user.usedInvite, { cascade: false })
  @JoinColumn()
  usedBy: User
}
