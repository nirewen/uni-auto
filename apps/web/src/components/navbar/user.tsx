import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/auth-provider'
import { cn } from '@/lib/utils'
import { ChevronDown, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export function LoggedInUser() {
  const { signOut, user } = useAuth()

  if (!user) {
    return (
      <Button
        className='bg-neutral-900 border-neutral-800'
        variant='outline'
        asChild
      >
        <Link to='/auth/login'>Entrar</Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'flex h-auto gap-2 pr-2 bg-neutral-900 border-neutral-800',
            {
              'pl-2': user.avatarUrl,
            }
          )}
          variant='outline'
        >
          <img
            src={user.avatarUrl}
            alt={user.displayName}
            className='w-6 rounded-full'
          />
          {user.displayName}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuItem onClick={signOut}>
          <LogOut className='w-4 h-4 mr-2' />
          <span>Encerrar sessão</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
