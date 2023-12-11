import React, { PropsWithChildren } from 'react'

import { useUser } from '@/hooks/useUser'
import { TokenPair, User } from '@/lib/api'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

interface AuthContextProps {
  user?: User
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (tokens: TokenPair) => Promise<void>
  signOut: () => Promise<void>
  updateUser?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<User, unknown>>
}

export const AuthContext = React.createContext<AuthContextProps>(null!)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: user, refetch, isLoading } = useUser()
  const navigate = useNavigate()

  async function signIn(tokens: TokenPair) {
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)

    navigate('/')
  }

  async function signOut() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    navigate('/auth/login')
  }

  const isAuthenticated = localStorage.getItem('access_token') !== null

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        updateUser: refetch,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}
