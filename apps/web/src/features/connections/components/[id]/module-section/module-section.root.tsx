import { PropsWithChildren } from 'react'

export function ModuleSectionRoot(props: PropsWithChildren) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-solid border-neutral-800 bg-neutral-900 p-2 md:p-4">
      {props.children}
    </section>
  )
}
