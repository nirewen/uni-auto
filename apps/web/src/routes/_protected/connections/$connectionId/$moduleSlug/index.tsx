import { useConnection } from '@/hooks/useConnections'
import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet'
import { AutoRU } from './modules/-auto-ru'

export const Route = createFileRoute(
  '/_protected/connections/$connectionId/$moduleSlug/',
)({
  component: ModuleSettingsComponent,
})

function ModuleSettingsComponent() {
  const { connectionId, moduleSlug } = Route.useParams()
  const { data } = useConnection(connectionId!)

  if (moduleSlug === 'auto-ru') {
    return (
      <>
        <Helmet
          title={`UniAuto \u007C ${data?.provider.name} - ${data?.identifier} > AutoRU`}
        />
        <AutoRU />
      </>
    )
  }

  return <div>Módulo não encontrado</div>
}
