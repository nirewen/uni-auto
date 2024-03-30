import { Copy } from '@/components/copy'
import { Show } from '@/components/flow/show'
import { DateSpan } from '@/components/table/date-span'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { InviteUse } from '@/lib/api'
import { nameToInitials } from '@/lib/utils'
import { CalendarDaysIcon, QrCodeIcon } from 'lucide-react'

type InviteUseProps = {
  use: InviteUse
  controls?: boolean
}

export function InviteUseCard({ use, controls = false }: InviteUseProps) {
  if (!use) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer border-[7px] border-background ring-1 ring-input hover:border-accent">
          <AvatarImage className="object-cover" src={use.usedBy.avatarUrl} />
          <AvatarFallback>
            {nameToInitials(use.usedBy.displayName)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage className="object-cover" src={use.usedBy.avatarUrl} />
            <AvatarFallback>
              {nameToInitials(use.usedBy.displayName)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="flex items-center gap-1 text-sm font-semibold">
              {use.usedBy.displayName}
            </h4>
            <p className="text-sm">{use.usedBy.email}</p>
            <div className="flex items-center pt-2">
              <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
                Usado em <DateSpan date={use.usedAt} />
              </span>
            </div>
          </div>
          <Show when={controls}>
            <div className="self-start">
              <Copy content={use.usedBy.id} icon={QrCodeIcon} hideContent />
            </div>
          </Show>
        </div>
      </PopoverContent>
    </Popover>
  )
}
