import axios from 'axios'

import { useRefreshToken } from '@/hooks/useAuth'

export function useAxios() {
  const { mutateAsync: refreshToken } = useRefreshToken()

  const api = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      const alreadyRefreshed = originalRequest._alreadyRefreshed

      if (error.response?.status === 401 && !alreadyRefreshed) {
        originalRequest._alreadyRefreshed = true

        await refreshToken()

        return api(originalRequest)
      }
      return Promise.reject(error)
    },
  )

  return api
}
