import { GraduationCapIcon } from 'lucide-react'

import { Provider } from '@/lib/api'

import { ProviderCard } from '@/features/connections/provider/provider-card'
import { ModuleSection } from '../[id]/module-section'
import { ConnectionInfoLoader } from './connection-info.loader'

type ConnectionInfoProviderProps = {
  provider?: Provider
}

export function ConnectionInfoProvider({
  provider,
}: ConnectionInfoProviderProps) {
  if (!provider) return <ConnectionInfoLoader />

  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <GraduationCapIcon className="h-6 w-6" />
        </ModuleSection.Icon>
        <ModuleSection.Title>Provedor</ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <div className="flex flex-1 flex-col gap-2 text-sm text-neutral-200">
          <span>Esse é o provedor da sua conexão.</span>
          <span>
            O login que você usou para adicionar a conexão ao sistema.
          </span>
          <ProviderCard provider={provider} />
        </div>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
