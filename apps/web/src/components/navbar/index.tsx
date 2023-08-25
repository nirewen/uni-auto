import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import { LoggedInUser } from './user'

export function Navbar() {
  return (
    <div className='flex items-center w-full p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      <div className='flex items-center flex-1 gap-4'>
        <button className='flex p-2 border border-solid rounded-md bg-neutral-800 border-neutral-700'>
          <MenuIcon className='w-6 h-6 text-neutral-300' />
        </button>
      </div>
      <Image
        src='./Logo.svg'
        width={32}
        height={32}
        alt='Logo'
        className='opacity-80'
      />
      <div className='flex items-center justify-end flex-1 gap-2'>
        <LoggedInUser />
      </div>
    </div>
  )
}
