import { Loader2Icon, PuzzleIcon } from 'lucide-react'

import { Show } from '@/components/util/show'
import { cn } from '@/lib/utils'

import { ModuleSection } from '../[id]/module-section'

export function ConnectionInfoType({ type }: { type?: string }) {
  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <PuzzleIcon className="h-8 w-8" />
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
            <span
              className={cn('p-2 mt-auto rounded-md font-bold', {
                'bg-green-700 text-white': type === 'STANDARD',
                'bg-amber-600 text-white': type === 'LEGACY',
              })}
            >
              {type}
            </span>
          </div>
        </Show>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
