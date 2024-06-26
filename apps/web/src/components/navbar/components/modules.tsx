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
import { useConnection } from '@/features/connections/hooks'
import { cn } from '@/lib/utils'
import { useNavigate, useParams } from '@tanstack/react-router'
import { ChevronDown, PackageIcon } from 'lucide-react'
import { useState } from 'react'
import { AddModule } from './add-module'

export function Modules() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { connectionId, moduleSlug } = useParams({
    from: '/_protected/connections/$connectionId/$moduleSlug/',
  })
  const connection = useConnection(connectionId)

  if (!connection?.data || connection.isLoading) {
    return null
  }

  const modules = connection.data.modules?.map((ms) => ms.module)
  const selected = modules?.find((m) => m.slug === moduleSlug)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'flex h-auto cursor-pointer select-none items-center justify-between gap-2 text-ellipsis rounded-full border-neutral-800 bg-neutral-900 p-2 text-left text-sm pr-4 sm:pr-2',
          )}
        >
          <Show
            when={!!selected}
            fallback={
              <>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-neutral-800">
                  <PackageIcon />
                </div>
                <div className="flex-1 leading-4">
                  Escolha um
                  <br />
                  módulo
                </div>
              </>
            }
          >
            <div className="h-9 w-9 rounded-full bg-neutral-800">
              <img
                className="h-9 w-9 min-w-9 rounded-full bg-neutral-800"
                src={`/img/${selected?.slug}.png`}
                alt={`Ícone para ${selected?.name}`}
              />
            </div>
            <div className="flex flex-1 flex-col leading-4">
              <strong>{selected?.name}</strong>
            </div>
          </Show>
          <ChevronDown
            className={cn('ml-2 hidden h-4 w-4 shrink-0 opacity-50 sm:flex')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder="Selecione o módulo..." />
          <CommandList>
            <CommandEmpty>Nenhum módulo encontrado.</CommandEmpty>
            <CommandGroup>
              <For each={modules}>
                {(module) => (
                  <CommandItem
                    key={module.id}
                    className="flex h-auto cursor-pointer select-none items-center justify-between gap-2 text-ellipsis rounded-full border-neutral-800 bg-neutral-900 p-2 text-left text-sm"
                    onSelect={() => {
                      setOpen(false)
                      navigate({
                        to: '/connections/$connectionId/$moduleSlug',
                        params: {
                          connectionId: connection.data!.id,
                          moduleSlug: module.slug,
                        },
                      })
                    }}
                  >
                    <div className="h-9 w-9 rounded-full bg-neutral-800">
                      <img
                        className="h-9 w-9 min-w-9 rounded-full bg-neutral-800"
                        src={`/img/${module.slug}.png`}
                        alt={`Ícone para ${module.name}`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col leading-4">
                      <strong>{module.name}</strong>
                    </div>
                  </CommandItem>
                )}
              </For>
              <CommandItem className="mt-1">
                <AddModule
                  size="md"
                  className="-mx-2 -my-1 h-8 flex-1 justify-start rounded-sm border-none bg-transparent"
                  onAdd={() => setOpen(false)}
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
