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

@Entity({ name: 'invite_codes' })
export class InviteCode {
  @PrimaryGeneratedColumn('uuid')
  id: string

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
