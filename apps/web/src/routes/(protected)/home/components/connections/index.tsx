'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { cn } from '@/lib/utils'

const frameworks = [
  {
    value: 'next.js',
    label: 'UFSM',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

export function Connections() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='justify-between pl-2 pr-2 md:flex-1 bg-neutral-900 border-neutral-800 text-ellipsis'
        >
          {value ? (
            frameworks.find(framework => framework.value === value)?.label
          ) : (
            <div className='flex items-center gap-2'>
              <Avatar className='w-6 h-6'>
                <AvatarImage src='https://github.com/nirewen.png' />
                <AvatarFallback>NW</AvatarFallback>
              </Avatar>
              <div className='hidden md:inline'>Selecione a conexão...</div>
            </div>
          )}
          <ChevronsUpDown className='hidden w-4 h-4 ml-2 opacity-50 shrink-0 md:inline' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[300px]'>
        <Command>
          <CommandInput placeholder='Selecione a conexão...' />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map(framework => (
              <CommandItem
                key={framework.value}
                onSelect={() => {
                  setValue(framework.value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
