import { Link, useLocation } from 'react-router-dom'
import { LoggedInUser } from './user'

import logo from '@/assets/Logo.svg'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { pathname } = useLocation()

  return (
    <div className='flex items-center w-full p-1 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      <Link to='/connections'>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-4 p-1 rounded-md bg-neutral-800'>
            <img src={logo} alt='Logo' width={32} height={32} />
          </div>
          <div
            className={cn(
              'items-center hidden gap-4 p-1 px-3 py-2 rounded-md md:flex',
              {
                'bg-neutral-800': pathname.startsWith('/connections'),
              }
            )}
          >
            Conexões
          </div>
        </div>
      </Link>
      <div className='flex items-center justify-end flex-1 gap-2'>
        <LoggedInUser />
      </div>
    </div>
  )
}
