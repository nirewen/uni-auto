import { User } from '../users/types'

export type InviteUse = {
  id: string
  invite: InviteCode
  usedBy: User
  usedAt: string
}

export type InviteCode = {
  id: string
  code: string
  role: string
  maxUses: number
  active: boolean
  createdAt: string
  createdBy: User
  assignedTo: User
  usableBy: User
  uses: InviteUse[]
}

export type CreateInviteDto = {
  code?: string
  role?: string
  maxUses?: number
  active?: boolean
  assignedTo?: string
  usableBy?: string
  createdBy?: string
}
