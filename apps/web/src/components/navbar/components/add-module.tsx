import * as React from 'react'

import { Plus } from 'lucide-react'

import { useNavigate, useParams } from '@tanstack/react-router'

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
import { Skeleton } from '@/components/ui/skeleton'
import { useConnection } from '@/features/connections/hooks'
import {
  useModulesByProvider,
  useToggleModuleForConnection,
} from '@/features/modules/hooks'
import { cn } from '@/lib/utils'

type AddModuleProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onAdd: () => void
}

export function AddModule({ size, className, onAdd }: AddModuleProps) {
  const { connectionId } = useParams({
    from: '/_protected/connections/$connectionId',
  })
  const [open, setOpen] = React.useState(false)
  const { data } = useConnection(connectionId)
  const { data: modules, isLoading } = useModulesByProvider(
    data?.provider.slug!,
  )
  const { mutateAsync: toggle } = useToggleModuleForConnection(connectionId)
  const navigate = useNavigate()

  if (!modules || isLoading) return <Skeleton className="h-8 w-full" />

  const availableModules = modules.filter((module) => {
    return !data?.modules?.some((m) => m.module.slug === module.slug)
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'gap-2 px-3 md:flex-1 md:pl-2 md:pr-2 bg-neutral-900 border-neutral-800 text-ellipsis',
            {
              'md:flex-grow-0 md:p-3': size === 'sm',
            },
            className,
          )}
        >
          <Plus className="h-4 w-4" />
          <span
            className={cn('hidden sm:inline', {
              'sm:hidden': size === 'sm',
              inline: size === 'md',
            })}
          >
            Adicionar módulo
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandInput placeholder="Selecione o módulo..." />
          <CommandEmpty>Nenhum módulo encontrado.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {availableModules.map((module) => (
                <CommandItem
                  key={module.id}
                  onSelect={() => {
                    setOpen(false)

                    toggle({
                      slug: module.slug,
                      enabled: true,
                    }).then(() => {
                      onAdd()
                      navigate({
                        to: `/connections/$connectionId/$moduleSlug`,
                        params: {
                          connectionId: connectionId,
                          moduleSlug: module.slug,
                        },
                      })
                    })
                  }}
                >
                  {module.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
