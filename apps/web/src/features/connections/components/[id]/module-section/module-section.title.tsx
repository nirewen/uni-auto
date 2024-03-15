import { PropsWithChildren } from 'react'

export function ModuleSectionTitle(props: PropsWithChildren) {
  return (
    <h2 className="text-xl font-bold text-neutral-100 md:text-2xl">
      {props.children}
    </h2>
  )
}
