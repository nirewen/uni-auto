import { Plus } from 'lucide-react'
import * as React from 'react'

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
import { useProviders } from '@/hooks/useProviders'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

type AddConnectionProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AddConnection({ size, className }: AddConnectionProps) {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const { data: providers, isLoading } = useProviders()

  if (!providers || isLoading) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'gap-2 px-3 md:flex-1 md:pl-2 md:pr-2 bg-neutral-900 border-neutral-800 text-ellipsis',
            {
              'md:flex-grow-0 md:p-3': size === 'sm',
            },
            className
          )}
        >
          <Plus className='w-4 h-4' />
          <span
            className={cn('hidden sm:inline', {
              'sm:hidden': size === 'sm',
              inline: size === 'md',
            })}
          >
            Adicionar conexão
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[300px]'>
        <Command>
          <CommandInput placeholder='Selecione a conexão...' />
          <CommandEmpty>Nenhuma conexão encontrada.</CommandEmpty>
          <CommandGroup>
            {providers.map(provider => (
              <CommandItem
                key={provider.id}
                onSelect={() => {
                  navigate('/connections/new/' + provider.slug)

                  setOpen(false)
                }}
              >
                {provider.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
