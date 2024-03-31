import React, { PropsWithChildren } from 'react'

import { useCurrentUser } from '@/features/users/hooks'
import { User } from '@/features/users/types'
import { TokenPair } from '@/lib/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios, { AxiosError } from 'axios'

interface AuthContextProps {
  user?: User
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => void
}

export const AuthContext = React.createContext<AuthContextProps>(null!)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: user, isLoading } = useCurrentUser()
  const { mutate: logout } = useLogout()

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut: logout,
        isLoading: isLoading && !!user,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return React.useContext(AuthContext)
}

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () =>
      axios.post<{ user: User; tokens: TokenPair }>('/api/auth/logout'),
    onSuccess: () => {
      navigate({ to: '/auth/login' })
      queryClient.clear()
    },
  })
}

export function useRefreshToken() {
  const { mutate: logout } = useLogout()

  return useMutation({
    mutationKey: ['refresh-token'],
    mutationFn: () =>
      axios
        .post<{ user: User; tokens: TokenPair }>('/api/auth/refresh')
        .catch(async (e) => {
          if (e instanceof AxiosError) {
            if (e.response?.status === 401) {
              logout()
            }
          }
        }),
  })
}
