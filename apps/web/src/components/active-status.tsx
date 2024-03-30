import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

type ActiveStatusProps = {
  active: boolean
}

export function ActiveStatus({ active }: ActiveStatusProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span
            className={cn('flex h-3 w-3 shrink-0 rounded-full', {
              'bg-green-500': active,
              'bg-red-500': !active,
            })}
          ></span>
        </TooltipTrigger>
        <TooltipContent>{active ? 'Ativo' : 'Inativo'}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
