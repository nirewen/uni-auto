import { api } from '@/lib/api'
import { Paginated, TableQuery } from '@/lib/types'
import { User } from './types'

export function getCurrentUser() {
  return () => api.get<User>('/users/@me')
}

export function deleteCurrentUser() {
  return () => api.delete<User>('/users/@me')
}

export function getAllUsers(params: TableQuery) {
  return () => api.get<Paginated<User>>('/users', { params })
}
