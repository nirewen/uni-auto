import { PropsWithChildren } from 'react'

export function CardTitle(props: PropsWithChildren) {
  return (
    <h3 className="text-md flex items-center justify-between text-neutral-100">
      {props.children}
    </h3>
  )
}
