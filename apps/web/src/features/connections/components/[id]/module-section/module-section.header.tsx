import { PropsWithChildren } from 'react'

export function ModuleSectionHeader(props: PropsWithChildren) {
  return <div className="relative flex gap-2">{props.children}</div>
}
