import { Link, useRouterState } from '@tanstack/react-router'

import { Loader2Icon } from 'lucide-react'

import logo from '@/assets/Logo.svg'
import { Show } from '@/components/flow/show'

export function UniAutoLogo() {
  const isLoading = useRouterState({
    select: (state) => state.status === 'pending',
  })

  return (
    <Link to="/">
      <div className="flex select-none items-center gap-2 p-1">
        <Show
          when={!isLoading}
          fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
        >
          <img className="h-8 w-8 min-w-8" src={logo} alt="Logo" />
        </Show>
        <span className="hidden font-logo font-semibold md:inline">
          uni-auto
        </span>
      </div>
    </Link>
  )
}
