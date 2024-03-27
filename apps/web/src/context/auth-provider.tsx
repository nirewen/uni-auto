import React, { PropsWithChildren } from 'react'

import { useUser } from '@/hooks/useUser'
import { TokenPair, User } from '@/lib/api'
import { useTokenUser } from '@/lib/utils'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

interface AuthContextProps {
  user?: User
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (tokens: TokenPair) => Promise<void>
  signOut: () => Promise<void>
  updateUser?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters) | undefined,
  ) => Promise<QueryObserverResult<User, unknown>>
}

export const AuthContext = React.createContext<AuthContextProps>(null!)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: user, refetch, isLoading } = useUser()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: isAuthenticated } = useTokenUser()

  async function signIn(tokens: TokenPair) {
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)

    navigate({
      to: '/connections',
    })

    queryClient.invalidateQueries({
      queryKey: ['user'],
    })
  }

  async function signOut() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    queryClient.invalidateQueries({
      queryKey: ['token-user'],
    })

    navigate({ to: '/auth/login' })
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        updateUser: refetch,
        isLoading: isLoading && !!isAuthenticated,
        isAuthenticated: !!isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}
