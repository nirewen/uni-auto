import { PropsWithChildren } from 'react'

export function CardRow(props: PropsWithChildren) {
  return (
    <div className="flex flex-row gap-2 overflow-auto">{props.children}</div>
  )
}
