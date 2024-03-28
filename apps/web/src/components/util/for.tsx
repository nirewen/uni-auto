import React from 'react'
import { Show } from './show'

export type ForProps<T> = {
  each: T[] | undefined | readonly T[]
  fallback?: React.ReactNode
  children: (
    item: T,
    index: number,
    array: T[] | readonly T[],
  ) => React.ReactNode
}

export function For<T>({ each, fallback = null, children }: ForProps<T>) {
  return each ? (
    <Show when={each.length > 0} fallback={fallback}>
      {each.map((item, index, array) => (
        <React.Fragment key={index}>
          {children(item, index, array)}
        </React.Fragment>
      ))}
    </Show>
  ) : null
}
