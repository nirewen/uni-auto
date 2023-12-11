import { ChevronRight } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { useConnection, useConnections } from '@/hooks/useConnections'
import { useProviderProfile } from '@/hooks/useProvider'
import { cn } from '@/lib/utils'
import { Link, useParams } from 'react-router-dom'
import { Connections } from './connections'
import { EnabledModules } from './enabled-modules'
import { Modules } from './modules'
import { ProfileCard } from './profile-card'

export function Sidebar() {
  const { id, module_slug } = useParams()
  const connections = useConnections()
  const connection = useConnection(id!)
  const profile = useProviderProfile(id!)

  if (connection.isLoading || connections.isLoading)
    return (
      <aside className='flex flex-1 gap-1 p-2 border border-solid rounded-md md:flex-col md:gap-2 bg-neutral-900 border-neutral-800'>
        <Skeleton className='h-10 rounded-sm' />
        <Skeleton className='h-16 border border-solid rounded-sm border-neutral-800' />
        <Skeleton className='h-10 border border-solid rounded-sm border-neutral-800' />
        <Skeleton className='h-10 rounded-sm' />
      </aside>
    )

  if (!connection.data && !connection.isLoading)
    return (
      <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
        <span className='text-sm text-muted-foreground'>
          Erro ao carregar módulos
        </span>
      </aside>
    )

  return (
    <aside className='flex flex-1 gap-1 p-2 overflow-hidden overflow-y-auto border border-solid rounded-md md:flex-col md:gap-2 bg-neutral-900 border-neutral-800'>
      {connections.data!.length > 0 && (
        <div className='flex flex-1 gap-2 md:flex-grow-0'>
          <Connections current={connection.data} />
          <EnabledModules
            list={connection.data.modules?.map((ms) => ms.module)}
          />
          <Modules enabled={connection.data.modules?.map((ms) => ms.module)!} />
        </div>
      )}
      {profile.data && <ProfileCard profile={profile.data} />}
      {connection.data.modules?.map((settings) => (
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
