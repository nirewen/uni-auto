import { api } from '@/lib/api'
import { Paginated, TableQuery } from '@/lib/types'
import { InviteCode } from './types'

export function consumeInvite() {
  return (code: string) => api.post(`/invites/use/${code}`)
}

export function getAllInvites(params: TableQuery) {
  return () => api.get<Paginated<InviteCode>>(`/invites`, { params })
}

export function getMyInvites(params: TableQuery) {
  return () => api.get<Paginated<InviteCode>>(`/invites/@me`, { params })
}
