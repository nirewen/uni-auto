import { PaginationState, SortingState } from '@tanstack/react-table'
import axios, { AxiosError } from 'axios'

export interface TokenPair {
  access_token: string
  refresh_token: string
}

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

export interface Module {
  id: string
  name: string
  slug: string
  enabled: boolean
}

export interface ModuleSettings {
  id: string
  module: Module
  settings: Record<string, unknown>
  updatedAt: string
  createdAt: string
}

export interface Connection {
  id: string
  identifier: string
  provider: Provider
  profile?: ConnectionProfile
  modules?: ModuleSettings[]
  type: string
  user?: User
  createdAt: string
  updatedAt: string
}

export interface Provider {
  id: string
  name: string
  slug: string
  enabled: boolean
}

export interface ConnectionProfile {
  displayName: string
  avatarUrl: string
  connection: Connection
  updatedAt: string
}

export type ConnectionModule<Settings = Record<string, any>> = {
  id: string
  settings: Settings
  enabled: boolean
  updatedAt: string
  createdAt: string
  connection: Connection
}

export type ConnectionProfileHealth = {
  status: 'OK' | 'ERROR'
}

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

export type Queue = {
  id: string
  status: string
  data: Record<string, any>
  endpoint: string
  connection: Connection
  createdAt: string
  updatedAt: string
}

export type Paginated<T> = {
  items: T[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}

export type TableQueryDto = {
  filter: string
  pagination: PaginationState
  sorting: SortingState
}
export class TableQuery {
  filter: string
  pagination: { page: number; limit: number }
  sorting: { id: string; desc: boolean }

  constructor({ pagination, sorting, filter }: TableQueryDto) {
    this.filter = filter
    this.pagination = {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    }
    this.sorting = {
      id: sorting[0].id,
      desc: sorting[0].desc,
    }
  }
}

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function refreshToken() {
  try {
    const {
      data: { tokens },
    } = await axios.post<{ user: User; tokens: TokenPair }>(
      '/api/auth/refresh',
      {
        refresh_token: localStorage.getItem('refresh_token'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    )

    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 401) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        window.location.href = '/auth/login'
      }
    }
  }
}

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'access_token',
    )}`

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const alreadyRefreshed = originalRequest._alreadyRefreshed

    if (
      error.response?.status === 401 &&
      !alreadyRefreshed &&
      !originalRequest.url?.includes('/login') &&
      window.location.pathname !== '/auth/login'
    ) {
      originalRequest._alreadyRefreshed = true

      await refreshToken()

      return api(originalRequest)
    }
    return Promise.reject(error)
  },
)
