import { PropsWithChildren } from 'react'

export function ModuleSectionHeader(props: PropsWithChildren) {
  return (
    <div className="relative flex flex-1 flex-col gap-2 md:flex-row md:items-center">
      {props.children}
    </div>
  )
}
