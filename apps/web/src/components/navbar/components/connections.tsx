import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { For } from '@/components/util/for'
import { Show } from '@/components/util/show'
import { useConnections } from '@/hooks/useConnections'
import { cn } from '@/lib/utils'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { AddConnection } from './add-connection'

export function Connections() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { connectionId } = useParams({
    from: '/_protected/connections/$connectionId',
  })
  const { data: connections, isLoading: isConnectionsLoading } =
    useConnections()

  if (!connections || isConnectionsLoading) {
    return null
  }

  const connection = connections.find((c) => c.id === connectionId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex h-auto cursor-pointer select-none items-center justify-between gap-2 text-ellipsis rounded-full border-neutral-800 bg-neutral-900 p-2 text-left text-sm"
        >
          <Show
            when={!!connection}
            fallback={
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-neutral-800"></div>
                <div className="hidden flex-1 flex-col leading-4 md:flex">
                  Escolha uma
                  <br />
                  conexão
                </div>
              </div>
            }
          >
            <img
              className="h-9 w-9 min-w-9 rounded-full bg-neutral-800"
              src={`/logos/${connection?.provider.slug}.png`}
              alt={`Logo da ${connection?.provider.name}`}
            />
            <div className="hidden flex-1 flex-col leading-4 md:flex">
              <strong>{connection?.identifier}</strong>
              <span>{connection?.provider.name}</span>
            </div>
          </Show>
          <ChevronDown className="ml-2 hidden h-4 w-4 shrink-0 opacity-50 md:inline" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Selecione a conexão..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <For each={connections}>
              {(connection) => (
                <CommandItem
                  key={connection.id}
                  onSelect={() => {
                    setOpen(false)
                    navigate({
                      to: '/connections/$connectionId/',
                      params: { connectionId: connection.id },
                    })
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      connectionId === connection.id
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {connection.identifier} - {connection.provider.name}
                </CommandItem>
              )}
            </For>
            <CommandItem>
              <AddConnection
                size="md"
                className="-mx-2 -my-1 h-8 flex-1 justify-start rounded-sm border-none bg-transparent"
              />
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
