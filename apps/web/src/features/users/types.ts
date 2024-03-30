import { Connection } from '../connections/types'
import { InviteCode, InviteUse } from '../invites/types'

export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl: string
  role: string
  active: boolean
  provider: string
  createdAt: string
  updatedAt: string
  connections: Connection[]
  usedInvites?: InviteUse[]
  createdInvites?: InviteCode[]
  assignedInvites?: InviteCode[]
  usableInvites?: InviteCode[]
}
