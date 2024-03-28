import { Copy } from '@/components/copy'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Show } from '@/components/util/show'
import { User } from '@/lib/api'
import { cn, formatDate, nameToInitials } from '@/lib/utils'
import { CalendarDaysIcon, TagIcon } from 'lucide-react'

type UserCardProps = {
  user: User
  mini?: boolean
}

export function UserCard({ user, mini }: UserCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn('justify-start gap-2 truncate', {
            'p-2 rounded-full': mini,
          })}
        >
          <Avatar className="h-5 w-5">
            <AvatarImage className="object-cover" src={user.avatarUrl} />
            <AvatarFallback>{nameToInitials(user.displayName)}</AvatarFallback>
          </Avatar>
          <Show when={!mini}>{user.displayName}</Show>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-fit">
        <div className="flex space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage className="object-cover" src={user.avatarUrl} />
            <AvatarFallback>{nameToInitials(user.displayName)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="flex items-center gap-1 text-sm font-semibold">
              <Copy content={user.id} icon={TagIcon} hideContent />
              {user.displayName}
            </h4>
            <p className="text-sm">{user.email}</p>
            <div className="flex items-center pt-2">
              <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
                Atualizado em {formatDate(user.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
