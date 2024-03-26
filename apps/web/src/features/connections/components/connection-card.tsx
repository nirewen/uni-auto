import { Button } from '@/components/ui/button'
import { useConnectionProfile } from '@/hooks/useConnections'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Settings } from 'lucide-react'
import { ConnectionCardLoader } from './connection-card.loader'

export function ConnectionCard() {
  const params = useParams({ from: '/_protected/connections/$connectionId' })
  const profile = useConnectionProfile(params.connectionId)
  const navigate = useNavigate()

  if (profile.isLoading || !profile.data) return <ConnectionCardLoader />

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
          <Settings />
        </Button>
      </div>
    </div>
  )
}
