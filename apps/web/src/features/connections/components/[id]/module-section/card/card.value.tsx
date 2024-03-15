import { PropsWithChildren } from 'react'

export function CardValue(props: PropsWithChildren) {
  return (
    <span className="text-3xl font-bold text-neutral-100">
      {props.children}
    </span>
  )
}
