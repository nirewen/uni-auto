import { cn } from '@/lib/utils'

type ConnectionTypeProps = {
  type: string
}

export function ConnectionType({ type }: ConnectionTypeProps) {
  return (
    <span
      className={cn(
        'p-2 h-9 rounded-md mt-auto flex items-center gap-2 border bg-neutral-600 border-neutral-500',
        {
          'border-green-600 bg-green-700 text-white': type === 'STANDARD',
          'border-neutral-500 bg-neutral-600 text-white': type === 'LEGACY',
        },
      )}
    >
      <span className="text-sm font-bold">{type}</span>
    </span>
  )
}
