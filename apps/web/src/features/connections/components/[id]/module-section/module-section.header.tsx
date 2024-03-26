import { PropsWithChildren } from 'react'

export function ModuleSectionHeader(props: PropsWithChildren) {
  return (
    <div className="relative flex items-center gap-2">{props.children}</div>
  )
}
