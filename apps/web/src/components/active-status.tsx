import { cn } from '@/lib/utils'

type ActiveStatusProps = {
  active: boolean
}

export function ActiveStatus({ active }: ActiveStatusProps) {
  return (
    <span
      className={cn('flex h-3 w-3 shrink-0 rounded-full', {
        'bg-green-500': active,
        'bg-red-500': !active,
      })}
    ></span>
  )
}
