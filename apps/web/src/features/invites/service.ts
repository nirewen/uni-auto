import { useAxios } from '@/lib/api'
import { Paginated, TableQuery } from '@/lib/types'
import { InviteCode } from './types'

export function consumeInvite() {
  const api = useAxios()

  return (code: string) => api.post(`/invites/use/${code}`)
}

export function getAllInvites(params: TableQuery) {
  const api = useAxios()

  return () => api.get<Paginated<InviteCode>>(`/invites`, { params })
}

export function getMyInvites(params: TableQuery) {
  const api = useAxios()

  return () => api.get<Paginated<InviteCode>>(`/invites/@me`, { params })
}
