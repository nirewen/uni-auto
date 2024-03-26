import { HeartPulseIcon } from 'lucide-react'

import { Show } from '@/components/util/show'
import { cn } from '@/lib/utils'

import { ModuleSection } from '../[id]/module-section'
import { ConnectionInfoLoader } from './connection-info.loader'

type ConnectionInfoHealthProps = {
  health?: string
}

export function ConnectionInfoHealth({ health }: ConnectionInfoHealthProps) {
  if (!health) return <ConnectionInfoLoader />

  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <HeartPulseIcon className="h-8 w-8" />
        </ModuleSection.Icon>
        <ModuleSection.Title>Saúde</ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <div className="flex flex-1 flex-col gap-2 text-sm text-neutral-200">
          <Show when={health === 'OK'}>
            <span>Sua conexão está saudável!</span>
            <span>
              Todos os módulos que dependem dela podem executar com sucesso!
            </span>
          </Show>
          <Show when={health === 'ERROR'}>
            <span>Sua conexão está com problemas...</span>
            <span>Alguns módulos podem não funcionar corretamente.</span>
            <span>Refaça a conexão para resolver.</span>
          </Show>
          <span
            className={cn('p-2 mt-auto rounded-md font-bold', {
              'bg-green-700 text-white': health === 'OK',
              'bg-red-600 text-white': health === 'ERROR',
            })}
          >
            <Show when={health === 'OK'}>SAUDÁVEL</Show>
            <Show when={health === 'ERROR'}>PROBLEMAS</Show>
          </span>
        </div>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
