import { PropsWithChildren } from 'react'

export function ModuleSectionSubtitle(props: PropsWithChildren) {
  return <span className="text-sm text-muted-foreground">{props.children}</span>
}
