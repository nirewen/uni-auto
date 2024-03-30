import { createFileRoute } from '@tanstack/react-router'

import { ProfileDangerZone } from '@/features/profile/danger-zone'
import { UserSection } from '@/features/profile/user-section'
import { useCurrentUser } from '@/features/users/hooks'

export const Route = createFileRoute('/_protected/profile/')({
  component: ProfileComponent,
})

function ProfileComponent() {
  const user = useCurrentUser()

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-auto p-3">
      <UserSection user={user.data} />
      <div className="mt-auto">
        <ProfileDangerZone />
      </div>
    </div>
  )
}
