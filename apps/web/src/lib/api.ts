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
  token: string
  provider: Provider
  modules?: ModuleSettings[]
}

export interface Provider {
  id: string
  name: string
  slug: string
  enabled: boolean
}

export interface ProviderProfile {
  provider: string
  identifier: string
  displayName: string
  avatarUrl: string
}

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'access_token'
    )}`

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 401 &&
      !error.config.url?.includes('/login') &&
      window.location.pathname !== '/auth/login'
    ) {
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
          }
        )

        localStorage.setItem('access_token', tokens.access_token)
        localStorage.setItem('refresh_token', tokens.refresh_token)

        return api(error.config)
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')

          window.location.href = '/auth/login'
        } else {
          Promise.reject(error)
        }
      }
    }
    return Promise.reject(error)
  }
)
