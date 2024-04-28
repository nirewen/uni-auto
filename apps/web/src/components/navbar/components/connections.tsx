import { For } from '@/components/flow/for'
import { Show } from '@/components/flow/show'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  useConnectionHealth,
  useConnections,
} from '@/features/connections/hooks'
import { cn, universityLogos } from '@/lib/utils'
import { useNavigate, useParams } from '@tanstack/react-router'
import { CableIcon, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { AddConnection } from './add-connection'

export function Connections() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { connectionId, moduleSlug } = useParams({
    from: '/_protected/connections/$connectionId/$moduleSlug/',
  })
  const { data: connections, isLoading: isConnectionsLoading } =
    useConnections()
  const { data: health, isLoading: isConnectionHealthLoading } =
    useConnectionHealth(connectionId)

  if (!connections || isConnectionsLoading) {
    return null
  }

  const connection = connections.find((c) => c.id === connectionId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="connections-popover"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex h-auto cursor-pointer select-none items-center justify-between gap-2 text-ellipsis rounded-full border-neutral-800 bg-neutral-900 p-2 text-left text-sm"
        >
          <Show
            when={!!connection}
            fallback={
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-neutral-800">
                  <CableIcon />
                </div>
                <div
                  className={cn('hidden flex-1 flex-col leading-4 md:flex', {
                    flex: !moduleSlug,
                  })}
                >
                  Escolha uma
                  <br />
                  conexão
                </div>
              </div>
            }
          >
            <div className="relative">
              <img
                className="h-9 w-9 min-w-9 rounded-full bg-neutral-800"
                src={universityLogos[connection?.provider.slug ?? 'none']}
                alt={`Logo da ${connection?.provider.name}`}
              />
              <Show when={!isConnectionHealthLoading}>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          'absolute right-0 bottom-0 h-3 w-3 rounded-full bg-red-600 border border-red-500',
                          {
                            'bg-green-600 border-green-500':
                              health?.status === 'OK',
                          },
                        )}
                      ></div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {health?.status === 'OK'
                        ? 'Conexão ativa'
                        : 'Conexão com erro - refaça a conexão'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Show>
            </div>
            <div className="hidden flex-1 flex-col leading-4 md:flex">
              <strong>{connection?.identifier}</strong>
              <span>{connection?.provider.name}</span>
            </div>
          </Show>
          <ChevronDown
            className={cn('ml-2 hidden h-4 w-4 shrink-0 opacity-50 md:inline', {
              flex: !moduleSlug && !connectionId,
            })}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder="Selecione a conexão..." />
          <CommandList>
            <CommandEmpty>Nenhuma conexão encontrada</CommandEmpty>
            <CommandGroup>
              <For each={connections}>
                {(connection) => (
                  <CommandItem
                    key={connection.id}
                    className="flex h-auto cursor-pointer select-none items-center justify-between gap-2 text-ellipsis rounded-full border-neutral-800 bg-neutral-900 p-2 text-left text-sm"
                    onSelect={() => {
                      setOpen(false)
                      navigate({
                        to: '/connections/$connectionId/',
                        params: { connectionId: connection.id },
                      })
                    }}
                  >
                    <img
                      className="h-9 w-9 min-w-9 rounded-full bg-neutral-800"
                      src={universityLogos[connection?.provider.slug ?? 'none']}
                      alt={`Logo da ${connection?.provider.name}`}
                    />
                    <div className="flex flex-1 flex-col leading-4">
                      <strong>{connection?.identifier}</strong>
                      <span>{connection?.provider.name}</span>
                    </div>
                  </CommandItem>
                )}
              </For>
              <CommandItem className="mt-1">
                <AddConnection
                  size="md"
                  className="-mx-2 -my-1 h-8 flex-1 justify-start rounded-sm border-none bg-transparent"
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
