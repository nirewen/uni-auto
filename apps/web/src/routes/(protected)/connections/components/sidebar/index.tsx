import { ChevronRight } from 'lucide-react'

import { useConnections } from '@/hooks/useConnections'
import { Link } from 'react-router-dom'
import { AddConnection } from '../add-connection'
import { ConnectionsPopover } from './connections-popover'

export function Sidebar() {
  const { data: connections, isLoading } = useConnections()

  if (isLoading)
    return (
      <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
        <span className='text-sm text-muted-foreground'>
          Carregando conexões
        </span>
      </aside>
    )

  if (!connections)
    return (
      <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
        <span className='text-sm text-muted-foreground'>
          Erro ao carregar conexões
        </span>
      </aside>
    )

  return (
    <aside className='flex flex-1 gap-2 p-2 border border-solid rounded-md md:flex-col bg-neutral-900 border-neutral-800'>
      {connections.map(connection => (
        <Link
          className='-mr-2 md:mr-0'
          key={connection.id}
          to={`/connections/${connection.id}`}
        >
          <div className='flex-col justify-center hidden h-10 gap-2 p-2 border border-solid rounded-md bg-neutral-800 border-neutral-700 md:flex'>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex items-center gap-2 text-sm font-medium text-neutral-100'>
                <span className='grid w-6 h-6 bg-white rounded-sm place-items-center'>
                  <img
                    src={`/icons/${connection.provider.slug}.ico`}
                    alt={`Logo da ${connection.provider.name}`}
                  />
                </span>
                {connection.provider.name} - {connection.identifier}
              </div>
              <ChevronRight className='w-6 h-6 text-neutral-300' />
            </div>
          </div>
        </Link>
      ))}
      <ConnectionsPopover list={connections} />
      <div className='flex'>
        <AddConnection />
      </div>
    </aside>
  )
}
