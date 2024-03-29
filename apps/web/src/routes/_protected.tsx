import { Navbar } from '@/components/navbar'
import { Show } from '@/components/util/show'
import { useAuth } from '@/context/auth-provider'
import { Activation } from '@/features/activation'
import { useTokenUser } from '@/lib/utils'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_protected')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const { isLoading, isAuthenticated } = useAuth()
  const user = useTokenUser()

  if (isLoading || !isAuthenticated) {
    return <Loader2 className="m-auto h-8 w-8 animate-spin" />
  }

  return (
    <main className="flex w-full max-w-7xl flex-1 flex-col gap-2 p-2 py-8 dark:text-white md:m-auto">
      <Navbar />
      <Show when={!!user.data && isAuthenticated && !user.data.active}>
        <Activation />
      </Show>
      <Show when={!!user.data && isAuthenticated && user.data.active}>
        <Outlet />
      </Show>
    </main>
  )
}
