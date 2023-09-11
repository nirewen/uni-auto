'use client'

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
import { Connection } from '@/lib/api'
import { useNavigate, useParams } from 'react-router-dom'

type ConnectionsPopoverProps = {
  list?: Connection[]
}

export function ConnectionsPopover({ list }: ConnectionsPopoverProps) {
  const { id } = useParams()
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const current = list?.find(m => id === m.id)

  if (!list) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='justify-between flex-1 pl-2 pr-2 md:hidden bg-neutral-900 border-neutral-800 text-ellipsis'
        >
          {current
            ? `${current.provider.name} - ${current.identifier}`
            : 'Selecione a conexão...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[326px]'>
        <Command>
          <CommandInput placeholder='Selecione a conexão...' />
          <CommandEmpty>Nenhuma conexão encontrada</CommandEmpty>
          <CommandGroup>
            {list.map(connection => (
              <CommandItem
                key={connection.id}
                onSelect={() => {
                  navigate(`/connections/${connection.id}`)

                  setOpen(false)
                }}
              >
                {connection.provider.name} - {connection.identifier}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
