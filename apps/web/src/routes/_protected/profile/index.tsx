import { ProfileDangerZone } from '@/features/profile/danger-zone'
import { UserSection } from '@/features/profile/user-section'
import { useUser } from '@/hooks/useUser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/profile/')({
  component: ProfileComponent,
})

function ProfileComponent() {
  const user = useUser()

  return (
    <div className="flex h-full flex-col gap-2 overflow-auto p-3">
      <UserSection user={user.data} />
      <div className="mt-auto">
        <ProfileDangerZone />
      </div>
    </div>
  )
}
