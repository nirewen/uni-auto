import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import { LockIcon, LogInIcon, LogOutIcon, UserRoundIcon } from 'lucide-react'
import { Show } from '../../flow/show'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'

export type LoggedInUserProps = {
  className?: string
}

export function LoggedInUser({ className }: LoggedInUserProps) {
  const { signOut, user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const actions = {
    profile: () => navigate({ to: '/profile/' }),
    admin: () => navigate({ to: '/admin/' }),
    signOut,
  }

  function loginWithProvider(provider: string) {
    window.location.pathname = `/api/auth/${provider}/login`
  }

  if (!isAuthenticated || !user) {
    return (
      <Button
        className={cn(
          'flex h-auto rounded-full border-neutral-800 bg-neutral-900 p-4',
          className,
        )}
        variant="outline"
        onClick={() => loginWithProvider('google')}
      >
        <LogInIcon className="h-5 w-5" />
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
        <DropdownMenuItem onClick={actions.profile}>
          <UserRoundIcon className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <Show when={user.role === 'ADMIN'}>
          <DropdownMenuItem onClick={actions.admin}>
            <LockIcon className="mr-2 h-4 w-4" />
            <span>Painel admin</span>
          </DropdownMenuItem>
        </Show>
        <DropdownMenuItem onClick={actions.signOut}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Encerrar sessão</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
