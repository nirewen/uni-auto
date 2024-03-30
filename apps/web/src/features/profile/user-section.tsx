import { DateSpan } from '@/components/table/date-span'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/lib/api'
import { nameToInitials } from '@/lib/utils'
import { CalendarDaysIcon, MailIcon } from 'lucide-react'
import { ModuleSection } from '../connections/components/[id]/module-section'

type UserSectionProps = {
  user?: User
}

export function UserSection({ user }: UserSectionProps) {
  if (!user) {
    return null
  }

  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <Avatar className="relative h-8 w-8 overflow-visible rounded-sm">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>{nameToInitials(user.displayName)}</AvatarFallback>
            <Avatar className="absolute -bottom-1 -right-1 h-4 w-4">
              <AvatarImage
                src={`https://www.google.com/s2/favicons?domain=${user.provider}.com&sz=24`}
              />
            </Avatar>
          </Avatar>
        </ModuleSection.Icon>
        <ModuleSection.Title>{user.displayName}</ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <div className="flex gap-4 text-nowrap sm:items-center">
          <div className="flex flex-col gap-1 overflow-hidden">
            <span className="flex items-center gap-1 truncate text-sm">
              <MailIcon className="h-4 w-4 flex-shrink-0" />
              {user.email}
            </span>
            <span className="flex items-center gap-1 text-sm">
              <CalendarDaysIcon className="h-4 w-4 flex-shrink-0" /> Usuário
              desde <DateSpan date={user.createdAt} />
            </span>
          </div>
        </div>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
