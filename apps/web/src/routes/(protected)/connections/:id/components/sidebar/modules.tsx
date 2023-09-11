'use client'

import { ChevronsUpDown, Plus } from 'lucide-react'
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
import { useConnection } from '@/hooks/useConnections'
import { useModules, useToggleModule } from '@/hooks/useModules'
import { Module } from '@/lib/api'
import { useParams } from 'react-router-dom'

type ModulesProps = {
  enabled: Module[]
}

export function Modules({ enabled }: ModulesProps) {
  const { id } = useParams()
  const [open, setOpen] = React.useState(false)
  const { data } = useConnection(id!)
  const { data: list, isLoading } = useModules(data?.provider.slug!)
  const { mutate: toggle } = useToggleModule(id!)

  if (!list && !isLoading)
    return (
      <Button
        variant='outline'
        role='combobox'
        aria-expanded={open}
        className='justify-between pl-2 pr-2 md:flex-1 bg-neutral-900 border-neutral-800 text-ellipsis'
        disabled
      >
        Erro ao carregar módulos
        <ChevronsUpDown className='hidden w-4 h-4 ml-2 opacity-50 shrink-0 md:inline' />
      </Button>
    )

  if (!list) {
    return null
  }

  const filteredList = list.filter(m => !enabled.find(em => em.id === m.id))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='flex-1 flex-grow-0 gap-2 p-3 px-3 bg-neutral-900 border-neutral-800 text-ellipsis'
        >
          <Plus className='w-4 h-4' />
          <span className='sr-only'>Adicionar módulo</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[326px]'>
        <Command>
          <CommandInput placeholder='Selecione o módulo...' />
          <CommandEmpty>Nenhum módulo encontrado</CommandEmpty>
          <CommandGroup>
            {filteredList.length === 0 && (
              <CommandItem disabled>Nenhum módulo disponível</CommandItem>
            )}
            {filteredList.map(module => (
              <CommandItem
                key={module.id}
                onSelect={() => {
                  toggle({
                    slug: module.slug,
                    enabled: true,
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
