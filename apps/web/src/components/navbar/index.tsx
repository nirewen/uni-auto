import { MenuIcon } from 'lucide-react'
import { LoggedInUser } from './user'

import logo from '@/assets/Logo.svg'

export function Navbar() {
  return (
    <div className='flex items-center w-full p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      <div className='flex items-center flex-1 gap-4'>
        <button className='flex p-2 border border-solid rounded-md bg-neutral-800 border-neutral-700'>
          <MenuIcon className='w-5 h-5 text-neutral-300' />
        </button>
      </div>
      <img src={logo} alt='Logo' width={32} height={32} />
      <div className='flex items-center justify-end flex-1 gap-2'>
        <LoggedInUser />
      </div>
    </div>
  )
}
