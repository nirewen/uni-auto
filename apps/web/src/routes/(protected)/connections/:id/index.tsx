import { Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet'
import { Navigate, Outlet, useParams } from 'react-router-dom'

import { Sidebar } from '@/features/connections/components/:id/sidebar'
import { useConnection } from '@/hooks/useConnections'

export function ConnectionHome() {
  const { id } = useParams()
  const { data, isLoading, isError } = useConnection(id!)

  if (isError) {
    return <Navigate to='/connections' />
  }

  return (
    <div className='grid md:grid-cols-[28%_auto] grid-rows-[auto_1fr] md:grid-rows-1 gap-2 md:overflow-hidden flex-1 relative'>
      <Helmet
        title={`UniAuto \u007C ${data?.provider.name} - ${data?.identifier}`}
      />
      {isLoading && (
        <div className='absolute inset-0 z-50 flex items-center justify-center overflow-hidden border border-solid rounded-md border-neutral-800 backdrop-blur-sm'>
          <Loader2 className='w-12 h-12 animate-spin' />
        </div>
      )}
      <Sidebar />
      <div className='flex flex-col w-full gap-2 overflow-auto'>
        <Outlet />
      </div>
    </div>
  )
}
