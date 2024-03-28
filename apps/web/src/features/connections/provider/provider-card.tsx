import { Provider } from '@/lib/api'
import { cn, universityLogos } from '@/lib/utils'

type ProviderCardProps = {
  provider: Provider
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <div
      className={cn(
        'p-2 h-9 rounded-md mt-auto min-w-32 truncate shrink-0 flex items-center gap-2 border bg-neutral-600 border-neutral-500',
        {
          'bg-provider-ufsm-500 border-provider-ufsm-400':
            provider?.slug === 'ufsm',
        },
      )}
    >
      <img
        className="aspect-square h-full w-auto rounded-full bg-neutral-800"
        src={universityLogos[provider?.slug ?? 'none']}
        alt={`Logo da ${provider?.name}`}
      />
      <span className="text-sm font-bold">{provider?.name}</span>
    </div>
  )
}
