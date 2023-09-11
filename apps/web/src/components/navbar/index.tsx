import { LoggedInUser } from './user'

import logo from '@/assets/Logo.svg'

export function Navbar() {
  return (
    <div className='flex items-center w-full p-2 pl-4 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      <img src={logo} alt='Logo' width={32} height={32} />
      <div className='flex items-center justify-end flex-1 gap-2'>
        <LoggedInUser />
      </div>
    </div>
  )
}
