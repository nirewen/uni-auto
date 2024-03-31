import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'

import { ThemeProvider } from '../components/theme-provider'

import { AuthProvider } from '../hooks/useAuth'

import { Toaster } from '@/components/ui/toaster'
import { Outlet, createRootRoute } from '@tanstack/react-router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

export const Route = createRootRoute({
  component: App,
  notFoundComponent: () => {
    return <p>Not Found (on root route)</p>
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="uni-auto-theme">
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </ThemeProvider>
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
      <Toaster />
    </QueryClientProvider>
  )
}
