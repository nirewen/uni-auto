import { ChevronRight } from 'lucide-react'

import { useQuery } from '@tanstack/react-query'

import ufsmLogo from '@/assets/ufsm-logo.png'
import { Connection, api } from '@/lib/api'
import { Link } from 'react-router-dom'

export function Sidebar() {
  const { data: connections, isLoading } = useQuery({
    queryKey: ['connections'],
    queryFn: () =>
      api.get<Connection[]>('/connections/@me').then(res => res.data),
  })

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
    <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      {connections.length > 0 ? (
        <span className='text-sm text-muted-foreground'>Suas conexões</span>
      ) : (
        <span className='text-sm text-muted-foreground'>
          Você não possui conexões
        </span>
      )}
      {connections.map(connection => (
        <Link key={connection.id} to={`/connections/${connection.id}`}>
          <div className='flex-col hidden gap-2 p-2 border border-solid rounded-md bg-neutral-800 border-neutral-700 md:flex'>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex items-center gap-2 text-sm text-neutral-100'>
                <img
                  src={ufsmLogo}
                  alt='Logo da UFSM'
                  className='w-6 h-6 rounded-full bg-neutral-200'
                />
                {connection.provider.name} - {connection.identifier}
              </div>
              <ChevronRight className='w-6 h-6 text-neutral-300' />
            </div>
          </div>
        </Link>
      ))}
    </aside>
  )
}
