import { ChevronRight, Plus } from 'lucide-react'

import { ModulesCombobox } from '@/components/modules-combobox'
import { Button } from '@/components/ui/button'

import { Connections } from '../connections'

export function Sidebar() {
  return (
    <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      <div className='flex gap-2'>
        <Connections />
        <ModulesCombobox />
      </div>
      <div className='flex-col hidden gap-2 p-2 border border-solid rounded-md bg-neutral-800 border-neutral-700 md:flex'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-sm text-neutral-100'>RU Automático</div>
          <ChevronRight className='w-6 h-6 text-neutral-300' />
        </div>
        <div className='text-sm text-muted-foreground'>
          Automatizar o agendamento de refeições no Restaurante Universitário
          toda semana
        </div>
      </div>
      <Button variant='outline' className='hidden bg-neutral-800 md:flex'>
        <Plus className='w-4 h-4 mr-2' />
        Adicionar módulo
      </Button>
    </aside>
  )
}
