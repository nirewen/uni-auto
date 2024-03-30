import { HeartPulseIcon } from 'lucide-react'

import { Show } from '@/components/flow/show'

import { ModuleSection } from '../[id]/module-section'
import { ConnectionHealth } from '../connection-card/connection-health'
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
          <HeartPulseIcon className="h-6 w-6" />
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
          <ConnectionHealth health={health} />
        </div>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
