import { ConnectionProfileWideCard } from '@/features/connections/components/connection-card/connection-profile'
import { useConnection } from '@/hooks/useConnections'
import {
  Navigate,
  Outlet,
  createFileRoute,
  redirect,
} from '@tanstack/react-router'
import { Helmet } from 'react-helmet'
import { z } from 'zod'

export const Route = createFileRoute('/_protected/connections/$connectionId')({
  component: ConnectionIdLayoutComponent,
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

function ConnectionIdLayoutComponent() {
  const { connectionId } = Route.useParams()
  const connection = useConnection(connectionId)

  if (connection.isError) {
    return <Navigate to="/connections/" />
  }

  return (
    <>
      <Helmet
        title={`UniAuto \u007C ${connection.data?.provider.name} - ${connection.data?.identifier}`}
      />
      <ConnectionProfileWideCard />
      <Outlet />
    </>
  )
}
