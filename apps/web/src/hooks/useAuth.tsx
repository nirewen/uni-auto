import React, { PropsWithChildren } from 'react'

import { useCurrentUser } from '@/features/users/hooks'
import { User } from '@/features/users/types'
import { TokenPair } from '@/lib/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouterState } from '@tanstack/react-router'
import axios, { AxiosError } from 'axios'

interface AuthContextProps {
  user?: User
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => void
  loginWithProvider: (provider: string) => void
}

export const AuthContext = React.createContext<AuthContextProps>(null!)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const query = useCurrentUser()
  const { mutate: logout } = useLogout()
  const isAuthenticated = query.isSuccess && !query.isError && !query.isLoading

  function loginWithProvider(provider: string) {
    window.location.pathname = `/api/auth/${provider}/login`
  }

  return (
    <AuthContext.Provider
      value={{
        user: query.data,
        isLoading: query.isLoading,
        isAuthenticated,
        signOut: logout,
        loginWithProvider,
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
  const router = useRouterState()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () =>
      axios.post<{ user: User; tokens: TokenPair }>('/api/auth/logout'),
    onSuccess: () => {
      window.location.href = '/'

      queryClient.unmount
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
