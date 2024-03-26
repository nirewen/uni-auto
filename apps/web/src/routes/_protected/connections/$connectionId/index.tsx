import { ConnectionInfo } from '@/features/connections/components/connection-info'
import { useConnection, useConnectionHealth } from '@/hooks/useConnections'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/connections/$connectionId/')({
  component: ConnectionIdRoute,
})

function ConnectionIdRoute() {
  const params = Route.useParams()
  const connection = useConnection(params.connectionId)
  const health = useConnectionHealth(params.connectionId)

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <ConnectionInfo.Provider provider={connection.data?.provider} />
        <ConnectionInfo.Type type={connection.data?.type} />
        <ConnectionInfo.Health health={health.data?.status} />
      </div>
      <ConnectionInfo.Footer />
    </div>
  )
}
