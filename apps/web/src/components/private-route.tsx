import { useAuth } from '@/context/auth-provider'
import { User } from '@/lib/api'
import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface PrivateRouteProps extends PropsWithChildren {
  loginRoute: string
  conditions?: (user: User) => boolean
}

export function PrivateRoute({
  children,
  loginRoute,
  conditions = () => true,
}: PrivateRouteProps) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (user && conditions && conditions(user)) {
    return children
  }

  if (isLoading) {
    return null
  }

  return <Navigate to={loginRoute} state={{ from: location }} replace />
}
