import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_protected/connections/$connectionId')({
  component: LayoutAComponent,
  parseParams: (params) => {
    return z
      .object({
        connectionId: z.string().uuid(),
      })
      .parse(params)
  },
  onError: (error) => {
    throw redirect({ to: '/connections/' })
  },
})

function LayoutAComponent() {
  return <Outlet />
}
