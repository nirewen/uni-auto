import { cn } from '@/lib/utils'
import { CheckIcon, Loader2Icon } from 'lucide-react'
import { Show } from '../../../components/flow/show'

type QueueEntryStatus = {
  status: string
}

export function QueueEntryStatus({ status }: QueueEntryStatus) {
  return (
    <div
      className={cn('rounded-full w-6 h-6 grid place-items-center ', {
        'bg-yellow-500': status === 'PENDING',
        'bg-green-500': status === 'COMPLETED',
      })}
    >
      <Show when={status === 'PENDING'}>
        <Loader2Icon className="h-4 w-4" />
      </Show>
      <Show when={status === 'COMPLETED'}>
        <CheckIcon className="h-4 w-4" />
      </Show>
    </div>
  )
}
