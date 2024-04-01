import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'

import { ThemeProvider } from '../components/theme-provider'

import { AuthProvider } from '../hooks/useAuth'

import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/toaster'
import * as userService from '@/features/users/service'
import { Outlet, createRootRoute } from '@tanstack/react-router'

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
  loader: () => userService.isUserLoggedIn(),
  notFoundComponent: () => {
    return <p>Not Found (on root route)</p>
  },
})

function App() {
  const data = Route.useLoaderData()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        enabled: data,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="uni-auto-theme">
        <AuthProvider>
          <main className="flex max-h-full w-full max-w-7xl flex-1 flex-col gap-2 p-2 dark:text-white md:m-auto md:py-8">
            <Navbar />
            <Outlet />
          </main>
        </AuthProvider>
        <Suspense>
          <TanStackRouterDevtools position="bottom-right" />
        </Suspense>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
