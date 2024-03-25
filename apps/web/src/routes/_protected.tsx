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
    <>
      <Navbar />
      <Show when={!!user.data && user.data.active} fallback={<Activation />}>
        <Outlet />
      </Show>
    </>
  )
}
