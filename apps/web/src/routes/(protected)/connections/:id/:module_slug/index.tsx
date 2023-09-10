import { useParams } from 'react-router-dom'
import { AutoRU } from './modules/auto-ru'

export const ModuleSettings = () => {
  const { module_slug } = useParams()

  if (module_slug === 'auto-ru') {
    return <AutoRU />
  }

  return <div>Módulo não encontrado</div>
}
