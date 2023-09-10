import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/sidebar'

export const Connections: React.FC = () => {
  return (
    <div className='grid md:grid-cols-[28%_auto] gap-2 md:overflow-hidden flex-1'>
      <Sidebar />
      <div className='flex flex-col w-full gap-2 overflow-auto'>
        <Outlet />
      </div>
    </div>
  )
}
