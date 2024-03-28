import { Copy } from '@/components/copy'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { useConnectionProfile } from '@/hooks/useConnections'
import { Connection } from '@/lib/api'
import { formatDate, nameToInitials } from '@/lib/utils'
import { useNavigate, useParams } from '@tanstack/react-router'
import { CalendarDaysIcon, SettingsIcon, TagIcon } from 'lucide-react'
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
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="sm" className="justify-start gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage className="object-cover" src={profile.avatarUrl} />
            <AvatarFallback>
              {nameToInitials(profile.displayName)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{profile.displayName}</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-80">
        <div className="flex space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage className="object-cover" src={profile.avatarUrl} />
            <AvatarFallback>
              {nameToInitials(profile.displayName)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="flex gap-1 text-sm font-semibold">
              <Copy content={connection.id} icon={TagIcon} hideContent />
              <Copy content={connection.identifier} />
            </h4>
            <h4 className="text-sm font-semibold">{profile.displayName}</h4>
            <div className="flex items-center pt-2">
              <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
                Atualizado em {formatDate(profile.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
