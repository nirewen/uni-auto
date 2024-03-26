import { GraduationCapIcon } from 'lucide-react'

import { Provider } from '@/lib/api'
import { cn, universityLogos } from '@/lib/utils'

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
          <GraduationCapIcon className="h-8 w-8" />
        </ModuleSection.Icon>
        <ModuleSection.Title>Provedor</ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <div className="flex flex-1 flex-col gap-2 text-sm text-neutral-200">
          <span>Esse é o provedor da sua conexão.</span>
          <span>
            O login que você usou para adicionar a conexão ao sistema.
          </span>
          <div
            className={cn(
              'p-2 h-9 rounded-md mt-auto flex items-center gap-2',
              {
                'bg-provider-ufsm': provider?.slug === 'ufsm',
              },
            )}
          >
            <img
              className="aspect-square h-full w-auto rounded-full bg-neutral-800"
              src={universityLogos[provider?.slug ?? 'none']}
              alt={`Logo da ${provider?.name}`}
            />
            <span className="text-sm font-bold">{provider?.name}</span>
          </div>
        </div>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
