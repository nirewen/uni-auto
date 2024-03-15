import { PropsWithChildren } from 'react'

export function ModuleSectionBody(props: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{props.children}</div>
}
