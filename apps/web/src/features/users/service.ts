import axios from 'axios'

import { useAxios } from '@/lib/api'
import { Paginated, TableQuery } from '@/lib/types'
import { User } from './types'

export function isUserLoggedIn() {
  return axios
    .head('/api/users/@me')
    .then(() => true)
    .catch(() =>
      axios
        .post('/api/auth/refresh')
        .then(() => true)
        .catch(() => false),
    )
}

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
