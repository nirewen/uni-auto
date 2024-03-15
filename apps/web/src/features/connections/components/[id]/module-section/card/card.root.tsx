import { PropsWithChildren } from 'react'

export function CardRoot(props: PropsWithChildren) {
  return (
    <div className="flex min-w-[17rem] flex-1 select-none flex-col gap-2 rounded-lg border border-solid border-neutral-800 bg-neutral-900 p-3">
      {props.children}
    </div>
  )
}
