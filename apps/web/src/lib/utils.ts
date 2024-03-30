import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { useQuery } from '@tanstack/react-query'
import type { JwtPayload } from '@uni-auto/api/auth/auth.interface'
import { User } from './api'

export const universityLogos: Record<string, string> = {
  ufsm: 'https://www.ufsm.br/app/uploads/2019/12/D%C3%ADstico.png',
  none: 'data:image/png;base64,',
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenUser() {
  const token = localStorage.getItem('access_token')

  if (!token) {
    return null
  }

  const [, payload] = token.split('.')
  const decoded = atob(payload)

  return JSON.parse(decoded) as JwtPayload
}

export function useTokenUser() {
  return useQuery({
    queryKey: ['token-user'],
    queryFn: getTokenUser,
  })
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const nameToInitials = (name: string) => {
  const [firstName, lastName] = name.split(' ')
  return (firstName[0] + (lastName?.at(0) ?? '')).toUpperCase()
}

export const getGhostUser = (): User => ({
  id: '0',
  displayName: 'ghost',
  email: 'ghost@domain.com',
  role: 'USER',
  avatarUrl: 'https://github.com/ghost.png',
  active: false,
  connections: [],
  createdAt: '',
  updatedAt: '',
  provider: '',
})
