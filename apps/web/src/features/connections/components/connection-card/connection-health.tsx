import { Show } from '@/components/flow/show'
import { cn } from '@/lib/utils'

type ConnectionHealthProps = {
  health?: string
  small?: boolean
}

export function ConnectionHealth({ health, small }: ConnectionHealthProps) {
  return (
    <span
      className={cn(
        'p-2 h-9 rounded-md mt-auto flex items-center gap-2 border bg-neutral-600 border-neutral-500',
        {
          'border-green-600 bg-green-700 text-white': health === 'OK',
          'border-red-500 bg-red-600 text-white': health === 'ERROR',
          'h-5 w-5 rounded-full': small,
        },
      )}
    >
      <Show when={!small}>
        <span className="text-sm font-bold">{health}</span>
      </Show>
    </span>
  )
}
