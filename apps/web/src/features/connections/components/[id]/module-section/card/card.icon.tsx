import { PropsWithChildren } from 'react'

export function CardIcon(props: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center">{props.children}</div>
  )
}
