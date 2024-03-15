import { PropsWithChildren } from 'react'

export function ModuleSectionOptions(props: PropsWithChildren) {
  return (
    <div className="absolute right-0 top-0 ml-auto flex items-center gap-2">
      {props.children}
    </div>
  )
}
