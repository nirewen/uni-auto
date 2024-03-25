import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { useQuery } from '@tanstack/react-query'
import type { JwtPayload } from '@uni-auto/api/auth/auth.interface'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useTokenUser() {
  return useQuery({
    queryKey: ['token-user'],
    queryFn: () => {
      const token = localStorage.getItem('access_token')

      if (!token) {
        return null
      }

      const [, payload] = token.split('.')
      const decoded = atob(payload)

      return JSON.parse(decoded) as JwtPayload
    },
  })
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
