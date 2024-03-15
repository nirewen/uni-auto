import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { ThemeProvider } from '../components/theme-provider'

import { AuthProvider } from '../context/auth-provider'

import { Outlet, createRootRoute } from '@tanstack/react-router'

const queryClient = new QueryClient()

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
        <main className="flex flex-col md:max-h-[90vh] flex-1 w-full gap-2 p-2 md:m-auto dark:text-white max-w-7xl">
          <AuthProvider>
            <Outlet></Outlet>
          </AuthProvider>
        </main>
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-right" />
    </QueryClientProvider>
  )
}
