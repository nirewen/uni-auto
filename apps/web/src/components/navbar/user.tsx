import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/auth-provider'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'

export type LoggedInUserProps = {
  className?: string
}

export function LoggedInUser({ className }: LoggedInUserProps) {
  const { signOut, user } = useAuth()

  if (!user) {
    return (
      <Button
        className="border-neutral-800 bg-neutral-900"
        variant="outline"
        asChild
      >
        <Link to="/auth/login">Entrar</Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'flex p-2 h-auto bg-neutral-900 border-neutral-800 rounded-full',
            className,
          )}
          variant="outline"
        >
          <img
            src={user.avatarUrl}
            alt={user.displayName}
            className="h-9 w-9 min-w-9 rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Encerrar sessão</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
