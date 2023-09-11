import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

import { useConnection } from '@/hooks/useConnections'
import { AutoRU } from './modules/auto-ru'

export const ModuleSettings = () => {
  const { id, module_slug } = useParams()
  const { data } = useConnection(id!)

  if (module_slug === 'auto-ru') {
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
