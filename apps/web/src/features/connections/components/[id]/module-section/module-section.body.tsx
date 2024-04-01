import { cn } from '@/lib/utils'

type ModuleSectionBodyProps = {
  children: React.ReactNode
  className?: string
}

export function ModuleSectionBody(props: ModuleSectionBodyProps) {
  return (
    <div className={cn('flex flex-1 flex-col gap-2', props.className)}>
      {props.children}
    </div>
  )
}
