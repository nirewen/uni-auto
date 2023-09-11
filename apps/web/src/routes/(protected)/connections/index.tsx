import { useConnections } from '@/hooks/useConnections'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/sidebar'

export const Connections: React.FC = () => {
  const { isLoading } = useConnections()

  return (
    <div className='grid md:grid-cols-[28%_auto] grid-rows-[auto_1fr] md:grid-rows-1 gap-2 md:overflow-hidden flex-1 relative'>
      <Helmet title={`UniAuto \u007C Conexões`} />
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
