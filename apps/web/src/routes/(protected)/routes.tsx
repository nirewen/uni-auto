import { useIsAuthenticated } from '@/context/auth-provider'
import { PropsWithChildren } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Connections } from './connections'
import { ConnectionHome } from './connections/:id'
import { ModuleSettings } from './connections/:id/:module_slug'
import { SelectModule } from './connections/:id/none-selected'
import { SelectConnection } from './connections/empty'
import { NewConnection } from './connections/new'
import { Layout } from './layout'

const PrivateRoute = ({
  children,
  loginPath,
}: PropsWithChildren<{ loginPath: string }>) => {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  if (isAuthenticated) {
    return children
  }

  return <Navigate to={loginPath} state={{ from: location }} replace />
}

export const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PrivateRoute loginPath={'/auth/login'}>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path={'/'} element={<Navigate to='/connections' />} />
        <Route path={'/connections'} element={<Connections />}>
          <Route path={'/connections'} element={<SelectConnection />} />
          <Route path={'/connections/new'} element={<NewConnection />}>
            <Route
              path={'/connections/new/:provider'}
              element={<NewConnection />}
            />
          </Route>
        </Route>
        <Route path={'/connections/:id'} element={<ConnectionHome />}>
          <Route path={'/connections/:id'} element={<SelectModule />} />
          <Route
            path={'/connections/:id/:module_slug'}
            element={<ModuleSettings />}
          />
        </Route>
      </Route>
    </Routes>
  )
}
