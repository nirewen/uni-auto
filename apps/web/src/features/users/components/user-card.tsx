import { Copy } from '@/components/copy'
import { Show } from '@/components/flow/show'
import { DateSpan } from '@/components/table/date-span'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAuth } from '@/hooks/useAuth'
import { cn, getGhostUser, nameToInitials } from '@/lib/utils'
import { CalendarDaysIcon, QrCodeIcon } from 'lucide-react'
import React from 'react'
import { User } from '../types'

type UserCardProps = {
  user: User
  mini?: boolean
}

export const UserCardTrigger = React.forwardRef<
  HTMLButtonElement,
  UserCardProps
>(({ user, mini, ...props }, ref) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn('justify-start gap-2 truncate', {
        'p-2 rounded-full': mini,
      })}
      ref={ref}
      {...props}
    >
      <Avatar className="h-5 w-5">
        <AvatarImage className="object-cover" src={user.avatarUrl} />
        <AvatarFallback>{nameToInitials(user.displayName)}</AvatarFallback>
      </Avatar>
      <Show when={!mini}>{user.displayName}</Show>
    </Button>
  )
})

export function UserCard({ user, mini }: UserCardProps) {
  const { user: loggedUser } = useAuth()
  if (!user || !loggedUser)
    return <UserCard mini={mini} user={getGhostUser()} />

  const controls = loggedUser.role === 'ADMIN'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <UserCardTrigger user={user} mini={mini} />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit">
        <div className="flex items-center space-x-4">
          <Avatar
            className={cn('h-12 w-12', {
              'w-16 h-16': controls,
            })}
          >
            <AvatarImage className="object-cover" src={user.avatarUrl} />
            <AvatarFallback>{nameToInitials(user.displayName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="flex items-center gap-1 text-sm font-semibold">
              {user.displayName}
            </h4>
            <p className="text-sm">{user.email}</p>
            <Show when={controls}>
              <div className="flex items-center">
                <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
                <span className="text-xs text-muted-foreground">
                  Atualizado em: <DateSpan date={user.updatedAt} />
                </span>
              </div>
            </Show>
          </div>
          <Show when={controls}>
            <div className="self-start">
              <Copy content={user.id} icon={QrCodeIcon} hideContent />
            </div>
          </Show>
        </div>
      </PopoverContent>
    </Popover>
  )
}
