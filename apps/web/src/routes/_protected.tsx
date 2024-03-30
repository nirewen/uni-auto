import { Show } from '@/components/flow/show'
import { Navbar } from '@/components/navbar'
import { useAuth } from '@/context/auth-provider'
import { Activation } from '@/features/invites/activation-form'
import { useTokenUser } from '@/lib/utils'
import { Outlet, createFileRoute, useRouterState } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_protected')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const { isLoading, isAuthenticated } = useAuth()
  const router = useRouterState()
  const user = useTokenUser()

  if (isLoading || !isAuthenticated) {
    return <Loader2 className="m-auto h-8 w-8 animate-spin" />
  }

  return (
    <main className="flex max-h-full w-full max-w-7xl flex-1 flex-col gap-2 p-2 dark:text-white md:m-auto md:py-8">
      <Navbar />
      <Show
        when={
          user.data &&
          isAuthenticated &&
          !user.data.active &&
          !router.location.pathname.startsWith('/profile')
        }
      >
        <Activation />
      </Show>
      <Show
        when={
          (user.data && isAuthenticated && user.data.active) ||
          router.location.pathname.startsWith('/profile')
        }
      >
        <Outlet />
      </Show>
    </main>
  )
}
