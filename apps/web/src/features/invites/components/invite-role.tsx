import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { BoxSelectIcon, UserCheckIcon } from 'lucide-react'

type InviteRoleProps = {
  role: string
}

export function InviteRoleIcon({ role }: InviteRoleProps) {
  const Icon =
    {
      ACCOUNT_ACTIVATION: UserCheckIcon,
    }[role] ?? BoxSelectIcon

  return (
    <Icon className="h-6 w-6 text-neutral-300 transition-colors hover:text-white" />
  )
}

export function InviteRoleName({ role }: InviteRoleProps) {
  switch (role) {
    case 'ACCOUNT_ACTIVATION':
      return 'Ativação de conta'
    default:
      return 'Papel desconhecido'
  }
}

export function InviteRole({ role }: InviteRoleProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <InviteRoleIcon role={role} />
        </TooltipTrigger>
        <TooltipContent>
          <InviteRoleName role={role} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
