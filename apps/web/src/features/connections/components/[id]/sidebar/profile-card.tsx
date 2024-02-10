import { ConnectionProfile } from '@/lib/api'

type ProfileCardProps = {
  profile: ConnectionProfile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md border border-neutral-800 bg-neutral-900 select-none">
      <img
        className="w-10 border rounded-sm pointer-events-none"
        src={profile.avatarUrl}
        alt={`Avatar de ${profile.displayName}`}
      />
      <div className="flex flex-col min-w-0">
        <h1 className="font-bold text-lg text-ellipsis whitespace-nowrap overflow-hidden">
          {profile.displayName}
        </h1>
        <span className="text-sm">{profile.connection.identifier}</span>
      </div>
    </div>
  )
}
