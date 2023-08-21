import { Plus } from 'lucide-react'
import { Connections } from '../connections'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'

export function Sidebar() {
  return (
    <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      <Connections />
      <div className='flex flex-col gap-2 p-2 border border-solid rounded-md bg-neutral-800 border-neutral-700'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-sm text-neutral-100'>RU Automático</div>
          <Switch className='data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-neutral-500' />
        </div>
        <div className='text-sm text-muted-foreground'>
          Automatizar o agendamento de refeições no Restaurante Universitário
          toda semana
        </div>
      </div>
      <Button variant='outline' className='bg-neutral-800'>
        <Plus className='w-4 h-4 mr-2' />
        Adicionar módulo
      </Button>
    </aside>
  )
}
