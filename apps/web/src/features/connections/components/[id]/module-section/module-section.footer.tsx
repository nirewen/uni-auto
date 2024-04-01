import { cn } from '@/lib/utils'

type ModuleSectionFooterProps = {
  children: React.ReactNode
  className?: string
}

export function ModuleSectionFooter(props: ModuleSectionFooterProps) {
  return (
    <div
      className={cn(
        'relative flex items-center gap-2 border-t border-neutral-800 pt-4',
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}
