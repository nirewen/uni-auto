import { ChevronRight } from 'lucide-react'

import { useQuery } from '@tanstack/react-query'

import { Connection, api } from '@/lib/api'
import { cn } from '@/lib/utils'
import { Link, useParams } from 'react-router-dom'

export function Sidebar() {
  const { id, module_slug } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['connection', id],
    queryFn: () => {
      return api.get<Connection>(`/connections/${id}`).then(res => res.data)
    },
  })

  if (isLoading)
    return (
      <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
        <span className='text-sm text-muted-foreground'>
          Carregando módulos
        </span>
      </aside>
    )

  if (!data || !data.modules?.length)
    return (
      <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
        <span className='text-sm text-muted-foreground'>
          Erro ao carregar módulos
        </span>
      </aside>
    )

  return (
    <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      {data.modules.length > 0 ? (
        <span className='text-sm text-muted-foreground'>Suas conexões</span>
      ) : (
        <span className='text-sm text-muted-foreground'>
          Você não possui conexões
        </span>
      )}
      {data.modules.map(settings => (
        <Link
          key={settings.id}
          to={`/connections/${id}/${settings.module.slug}`}
          state={{ settings: settings, connectionId: id }}
        >
          <div
            className={cn(
              'flex-col hidden gap-2 p-2 border border-solid rounded-md bg-neutral-800 border-neutral-700 md:flex hover:bg-neutral-700',
              {
                'bg-neutral-700': module_slug === settings.module.slug,
              }
            )}
          >
            <div className='flex flex-row items-center justify-between'>
              <div className='flex items-center gap-2 text-sm text-neutral-100'>
                {settings.module.name}
              </div>
              <ChevronRight className='w-6 h-6 text-neutral-300' />
            </div>
          </div>
        </Link>
      ))}
    </aside>
  )
}
