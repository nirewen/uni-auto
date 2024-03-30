import axios, { AxiosError } from 'axios'

import { User } from './services/user.service'
import { TokenPair } from './types'

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
