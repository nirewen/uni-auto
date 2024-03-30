import { CrownIcon, UserIcon } from 'lucide-react'

type RoleIconProps = {
  role: string
}

export function RoleIcon({ role }: RoleIconProps) {
  switch (role) {
    case 'ADMIN':
      return <CrownIcon className="h-6 w-6" />
    case 'USER':
    default:
      return <UserIcon className="h-6 w-6" />
  }
}
