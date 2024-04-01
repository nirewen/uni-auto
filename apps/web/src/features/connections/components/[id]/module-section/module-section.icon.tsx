import { cn } from '@/lib/utils'

type ModuleSectionIconProps = {
  children: React.ReactNode
  className?: string
}

export function ModuleSectionIcon(props: ModuleSectionIconProps) {
  return (
    <div
      className={cn(
        'self-start rounded-md bg-neutral-800 p-2',
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}
