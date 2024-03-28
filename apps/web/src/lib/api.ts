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
  createdAt: string
  updatedAt: string
  connections: Connection[]
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
