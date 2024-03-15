import { PropsWithChildren } from 'react'

export function CardSubtitle(props: PropsWithChildren) {
  return <span className="text-sm text-muted-foreground">{props.children}</span>
}
