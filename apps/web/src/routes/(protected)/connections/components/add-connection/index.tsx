'use client'

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
import { useNavigate } from 'react-router-dom'

const providers = [
  {
    value: 'ufsm',
    label: 'UFSM',
  },
]

export function AddConnection() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='hidden bg-neutral-800 md:flex'>
          <Plus className='w-4 h-4 mr-2' />
          Adicionar conexão
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[300px]'>
        <Command>
          <CommandInput placeholder='Selecione a conexão...' />
          <CommandEmpty>Nenhuma conexão encontrada.</CommandEmpty>
          <CommandGroup>
            {providers.map(provider => (
              <CommandItem
                key={provider.value}
                onSelect={() => {
                  navigate('/connections/new', {
                    state: { provider: provider.value },
                  })

                  setOpen(false)
                }}
              >
                {provider.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
