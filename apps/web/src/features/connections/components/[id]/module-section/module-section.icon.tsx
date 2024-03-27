import { PropsWithChildren } from 'react'

export function ModuleSectionIcon(props: PropsWithChildren) {
  return (
    <div className="self-start rounded-md bg-neutral-800 p-2">
      {props.children}
    </div>
  )
}
