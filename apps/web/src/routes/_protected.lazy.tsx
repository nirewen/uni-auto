import {
  Outlet,
  createLazyFileRoute,
  useRouterState,
} from '@tanstack/react-router'

import { Loader2 } from 'lucide-react'

import { Show } from '@/components/flow/show'
import { Activation } from '@/features/invites/components/activation-form'
import { useAuth } from '@/hooks/useAuth'

export const Route = createLazyFileRoute('/_protected')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouterState()

  if (isLoading || !isAuthenticated) {
    return <Loader2 className="m-auto h-8 w-8 animate-spin" />
  }

  return (
    <>
      <Show
        when={
          user &&
          isAuthenticated &&
          !user.active &&
          !router.location.pathname.startsWith('/profile')
        }
      >
        <Activation />
      </Show>
      <Show
        when={
          (user && isAuthenticated && user.active) ||
          router.location.pathname.startsWith('/profile')
        }
      >
        <Outlet />
      </Show>
    </>
  )
}
