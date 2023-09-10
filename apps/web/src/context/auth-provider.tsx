import React, { PropsWithChildren } from 'react'

import { User, api } from '@/lib/api'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from '@tanstack/react-query'

type Credentials = {
  username: string
  password: string
}

interface AuthContextProps {
  signIn: (credentials: Credentials) => Promise<void>
  signOut: () => Promise<void>
  signUp: (credentials: Credentials) => Promise<void>
  user?: User
  updateUser?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<User, unknown>>
  isLoading: boolean
}

export const AuthContext = React.createContext<AuthContextProps>(null!)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    data: user,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => api.get<User>('/users/@me').then(res => res.data),
    enabled: !!localStorage.getItem('access_token'),
  })

  async function signIn({ username, password }: Credentials) {
    const res = await api.post('/auth/signin', { username, password })
    const { tokens } = res.data

    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)

    refetch()
  }

  async function signOut() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  async function signUp({ username, password }: Credentials) {
    const res = await api.post('/auth/signup', { username, password })
    const { tokens } = res.data

    localStorage.setItem('auth_token', tokens.auth_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)

    refetch()
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        user,
        updateUser: refetch,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}

export const useIsAuthenticated = () => {
  return localStorage.getItem('access_token') !== null
}
