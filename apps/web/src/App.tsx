import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from './components/theme-provider'

import { AuthProvider } from './context/auth-provider'

import { ProtectedRoutes } from './routes/(protected)/routes'
import { AuthRoutes } from './routes/auth/routes'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <main className='flex flex-col md:max-h-[90vh] flex-1 w-full gap-2 p-2 md:m-auto dark:text-white max-w-7xl'>
          <BrowserRouter>
            <AuthProvider>
              <AuthRoutes />
              <ProtectedRoutes />
            </AuthProvider>
          </BrowserRouter>
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
