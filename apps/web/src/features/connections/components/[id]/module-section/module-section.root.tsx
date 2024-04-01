import { cn } from '@/lib/utils'

type ModuleSectionRootProps = {
  children: React.ReactNode
  className?: string
}

export function ModuleSectionRoot(props: ModuleSectionRootProps) {
  return (
    <section
      className={cn(
        'flex flex-col gap-2 rounded-2xl border border-solid border-neutral-800 bg-neutral-900 p-2 md:p-4',
        props.className,
      )}
    >
      {props.children}
    </section>
  )
}
