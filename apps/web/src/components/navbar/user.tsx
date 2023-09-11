import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/auth-provider'
import { ChevronDown, LogOut, User } from 'lucide-react'
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
        <Link to='/login'>Entrar</Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='flex h-auto gap-2 pr-2 bg-neutral-900 border-neutral-800'
          variant='outline'
        >
          {user.username}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link to='/profile'>
            <User className='w-4 h-4 mr-2' />
            Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className='w-4 h-4 mr-2' />
          <span>Encerrar sessão</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
