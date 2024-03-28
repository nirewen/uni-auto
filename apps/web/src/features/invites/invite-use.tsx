import { Copy } from '@/components/copy'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { InviteUse } from '@/lib/api'
import { formatDate, nameToInitials } from '@/lib/utils'
import { CalendarDaysIcon, TagIcon } from 'lucide-react'

type InviteUseProps = {
  use: InviteUse
}

export function InviteUseCard({ use }: InviteUseProps) {
  if (!use) return null

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 truncate rounded-full p-2"
        >
          <Avatar className="h-5 w-5">
            <AvatarImage className="object-cover" src={use.usedBy.avatarUrl} />
            <AvatarFallback>
              {nameToInitials(use.usedBy.displayName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-fit">
        <div className="flex space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage className="object-cover" src={use.usedBy.avatarUrl} />
            <AvatarFallback>
              {nameToInitials(use.usedBy.displayName)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="flex items-center gap-1 text-sm font-semibold">
              <Copy content={use.usedBy.id} icon={TagIcon} hideContent />
              {use.usedBy.displayName}
            </h4>
            <p className="text-sm">{use.usedBy.email}</p>
            <div className="flex items-center pt-2">
              <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
                Usado em {formatDate(use.usedAt)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
