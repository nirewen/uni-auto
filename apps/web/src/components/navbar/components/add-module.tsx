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
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useConnection } from '@/features/connections/hooks'
import {
  useModulesByProvider,
  useToggleModuleForConnection,
} from '@/features/modules/hooks'
import { cn } from '@/lib/utils'

type AddModuleProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AddModule({ size, className }: AddModuleProps) {
  const { connectionId } = useParams({
    from: '/_protected/connections/$connectionId',
  })
  const [open, setOpen] = React.useState(false)
  const { data } = useConnection(connectionId!)
  const { data: modules, isLoading } = useModulesByProvider(
    data?.provider.slug!,
  )
  const { mutate: toggle } = useToggleModuleForConnection(connectionId!)
  const navigate = useNavigate()

  if (!modules || isLoading) return null

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
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Selecione o módulo..." />
          <CommandEmpty>Nenhum módulo encontrado.</CommandEmpty>
          <CommandGroup>
            {modules.map((module) => (
              <CommandItem
                key={module.id}
                onSelect={() => {
                  toggle({
                    slug: module.slug,
                    enabled: true,
                  })

                  navigate({
                    to: `/connections/$connectionId/$moduleSlug`,
                    params: {
                      connectionId: connectionId,
                      moduleSlug: module.slug,
                    },
                  })

                  setOpen(false)
                }}
              >
                {module.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
