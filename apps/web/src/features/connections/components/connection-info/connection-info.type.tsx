import { Loader2Icon, PuzzleIcon } from 'lucide-react'

import { Show } from '@/components/util/show'

import { ModuleSection } from '../[id]/module-section'
import { ConnectionType } from '../connection-card/connection-type'
import { ConnectionInfoLoader } from './connection-info.loader'

export function ConnectionInfoType({ type }: { type?: string }) {
  if (!type) return <ConnectionInfoLoader />

  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <PuzzleIcon className="h-6 w-6" />
        </ModuleSection.Icon>
        <ModuleSection.Title>Tipo</ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <Show
          when={!!type}
          fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
        >
          <div className="flex flex-1 flex-col gap-2 text-sm text-neutral-200">
            <Show when={type === 'STANDARD'}>
              <span>Sua conexão suporta todas as novas funcionalidades!</span>
              <span>Além de mais segurança, tem suporte estendido!</span>
            </Show>
            <Show when={type === 'LEGACY'}>
              <span>
                Algumas coisas mudaram desde que você se conectou pela última
                vez...
              </span>
              <span>
                Refaça a conexão para ter acesso a todas as funcionalidades e
                mais segurança
              </span>
            </Show>
            <ConnectionType type={type} />
          </div>
        </Show>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
