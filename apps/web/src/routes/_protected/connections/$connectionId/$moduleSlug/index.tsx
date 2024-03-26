import { useConnection } from '@/hooks/useConnections'
import { createFileRoute } from '@tanstack/react-router'
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
    return <AutoRU />
  }

  return <div>Módulo não encontrado</div>
}
