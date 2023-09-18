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
import { Module } from '@/lib/api'
import { useNavigate, useParams } from 'react-router-dom'

type ModulesProps = {
  list?: Module[]
}

export function EnabledModules({ list }: ModulesProps) {
  const { id, module_slug } = useParams()
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const current = list?.find(m => module_slug === m.slug)

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
          {current ? current.name : 'Selecione o módulo...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[326px]'>
        <Command>
          <CommandInput placeholder='Selecione o módulo...' />
          <CommandEmpty>Nenhum módulo encontrado</CommandEmpty>
          <CommandGroup>
            {list.length === 0 && (
              <CommandItem disabled>Nenhum módulo disponível</CommandItem>
            )}
            {list.map(module => (
              <CommandItem
                key={module.id}
                onSelect={() => {
                  navigate(`/connections/${id}/${module.slug}`)

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
