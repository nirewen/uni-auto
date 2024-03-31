import { useAxios } from '@/lib/api'
import { Paginated, TableQuery } from '@/lib/types'
import { User } from './types'

export function getCurrentUser() {
  const api = useAxios()
  return () => api.get<User>('/users/@me')
}

export function deleteCurrentUser() {
  const api = useAxios()
  return () => api.delete<User>('/users/@me')
}

export function getAllUsers(params: TableQuery) {
  const api = useAxios()
  return () => api.get<Paginated<User>>('/users', { params })
}
