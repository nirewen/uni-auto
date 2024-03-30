import { Copy } from '@/components/copy'
import { DateSpan } from '@/components/table/date-span'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useConnectionProfile } from '@/features/connections/hooks'
import { Connection } from '@/features/connections/types'
import { nameToInitials } from '@/lib/utils'
import { useNavigate, useParams } from '@tanstack/react-router'
import { CalendarDaysIcon, QrCodeIcon, SettingsIcon } from 'lucide-react'
import {
  ConnectionProfileLoader,
  ConnectionProfileWideLoader,
} from './connection-profile.loader'

type ConnectionProfileProps = {
  connection?: Connection
}

export function ConnectionProfileWideCard() {
  const params = useParams({ from: '/_protected/connections/$connectionId' })
  const profile = useConnectionProfile(params.connectionId)
  const navigate = useNavigate()

  if (profile.isLoading || !profile.data) return <ConnectionProfileWideLoader />

  return (
    <div className="flex h-14 items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 p-2">
      <img
        src={profile.data.avatarUrl}
        className="aspect-square h-full w-auto rounded-full object-cover"
      />
      <div className="flex w-full flex-col overflow-hidden">
        <span className="text-sm">{profile.data.connection.identifier}</span>
        <span className="truncate whitespace-nowrap font-bold">
          {profile.data.displayName}
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          className="rounded-full border-neutral-700 bg-neutral-800"
          variant="outline"
          size="icon"
          onClick={() => navigate({ to: '/connections/$connectionId', params })}
        >
          <SettingsIcon />
        </Button>
      </div>
    </div>
  )
}

export function ConnectionProfileCard({ connection }: ConnectionProfileProps) {
  if (!connection) return <ConnectionProfileLoader />
  const { profile } = connection
  if (!profile) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="justify-start gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage className="object-cover" src={profile.avatarUrl} />
            <AvatarFallback>
              {nameToInitials(profile.displayName)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{profile.displayName}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage className="object-cover" src={profile.avatarUrl} />
            <AvatarFallback>
              {nameToInitials(profile.displayName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="flex gap-1 text-sm font-semibold">
              <Copy spanClassName="text-xs" content={connection.identifier} />
            </h4>
            <h4 className="text-sm font-semibold">{profile.displayName}</h4>
            <div className="flex items-center">
              <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
                Atualizado em <DateSpan date={connection.updatedAt} />
              </span>
            </div>
          </div>
          <div className="space-y-1 self-start">
            <Copy content={connection.id} icon={QrCodeIcon} hideContent />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
