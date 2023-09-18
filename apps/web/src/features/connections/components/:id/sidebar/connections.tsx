import { ChevronsUpDown } from 'lucide-react'
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
import { useConnections } from '@/hooks/useConnections'
import { Connection } from '@/lib/api'
import { useNavigate } from 'react-router-dom'
import { AddConnection } from '../../../components/add-connection'

type ConnectionsProps = {
  current: Connection
}

export function Connections({ current }: ConnectionsProps) {
  const [open, setOpen] = React.useState(false)
  const { data: list } = useConnections()
  const navigate = useNavigate()

  if (!list)
    return (
      <Button
        variant='outline'
        role='combobox'
        aria-expanded={open}
        className='justify-between pl-2 pr-2 md:flex-1 bg-neutral-900 border-neutral-800 text-ellipsis'
        disabled
      >
        Erro ao carregar conexões
        <ChevronsUpDown className='hidden w-4 h-4 ml-2 opacity-50 shrink-0 md:inline' />
      </Button>
    )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='justify-between pl-2 pr-2 md:flex-1 bg-neutral-900 border-neutral-800 text-ellipsis'
        >
          {current ? (
            <span className='flex items-center gap-2'>
              <span className='grid w-6 h-6 bg-white rounded-sm place-items-center'>
                <img
                  src={`/icons/${current.provider.slug}.ico`}
                  alt={`Logo da ${current.provider.name}`}
                />
              </span>
              <span className='hidden md:inline'>
                <span className='md:hidden lg:inline'>
                  {current.provider?.name}
                  {' - '}
                </span>
                {current.identifier}
              </span>
            </span>
          ) : (
            <span className='hidden md:inline'>Selecione a conexão...</span>
          )}
          <ChevronsUpDown className='hidden w-4 h-4 ml-2 opacity-50 shrink-0 md:inline' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[320px]'>
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
                {connection.provider?.name} - {connection.identifier}
              </CommandItem>
            ))}
            <CommandItem>
              <AddConnection
                size='md'
                className='justify-start flex-1 h-8 -mx-2 -mb-1 bg-transparent border-none rounded-sm'
              />
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
