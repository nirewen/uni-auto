import { PropsWithChildren } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import { ThemeProvider } from './components/theme-provider'

import { Login } from './routes/login'
import { Register } from './routes/register'

import { AuthProvider, useIsAuthenticated } from './context/auth-provider'
import { Connections } from './routes/(protected)/connections'
import { ConnectionHome } from './routes/(protected)/connections/:id'
import { ModuleSettings } from './routes/(protected)/connections/:id/:module_slug'
import { SelectModule } from './routes/(protected)/connections/:id/none-selected'
import { NewConnection } from './routes/(protected)/connections/new-connection'
import { SelectConnection } from './routes/(protected)/connections/none-selected'
import { Home } from './routes/(protected)/home'
import { Layout } from './routes/(protected)/layout'

const queryClient = new QueryClient()

export const App = () => {
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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AuthProvider>
          <main className='flex flex-col max-h-[90vh] h-full w-full gap-2 p-2 md:m-auto dark:text-white max-w-7xl'>
            <BrowserRouter>
              <Routes>
                <Route
                  element={
                    <PrivateRoute loginPath={'/login'}>
                      <Layout />
                    </PrivateRoute>
                  }
                >
                  <Route path={'/'} element={<Home />} />
                  <Route path={'/connections'} element={<Connections />}>
                    <Route
                      path={'/connections'}
                      element={<SelectConnection />}
                    />
                    <Route
                      path={'/connections/new'}
                      element={<NewConnection />}
                    />
                  </Route>
                  <Route path={'/connections/:id'} element={<ConnectionHome />}>
                    <Route
                      path={'/connections/:id'}
                      element={<SelectModule />}
                    />
                    <Route
                      path={'/connections/:id/:module_slug'}
                      element={<ModuleSettings />}
                    />
                  </Route>
                </Route>
                <Route path={'/login'} element={<Login />} />
                <Route path={'/register'} element={<Register />} />
              </Routes>
            </BrowserRouter>
          </main>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
