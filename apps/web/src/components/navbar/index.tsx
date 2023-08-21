import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { Input } from '../ui/input'
import { LoggedInUser } from './user'

export function Navbar() {
  return (
    <div className='flex items-center w-full p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      <div className='flex items-center flex-1 gap-4'>
        <button className='flex p-2 border border-solid rounded-md bg-neutral-800 border-neutral-700'>
          <MenuIcon className='w-6 h-6 text-neutral-300' />
        </button>
        <Link href='/'>Home</Link>
      </div>
      <div className='flex items-center gap-2'>
        <Input
          className='bg-neutral-900 border-neutral-700'
          placeholder='Search'
          type='search'
        />
        <LoggedInUser />
      </div>
    </div>
  )
}
