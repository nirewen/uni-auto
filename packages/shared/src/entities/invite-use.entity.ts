import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { InviteCode } from './invite-code.entity'
import { User } from './user.entity'

@Entity({ name: 'invite_uses' })
export class InviteUse {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => InviteCode, invite => invite.uses, { cascade: false })
  invite: InviteCode

  @ManyToOne(() => User, user => user.usedInvites, {
    cascade: false,
    onDelete: 'SET NULL',
  })
  usedBy: User

  @CreateDateColumn()
  usedAt: Date
}
