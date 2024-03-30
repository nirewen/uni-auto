export type ShowProps<T extends boolean | undefined> = {
  when: T
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function Show<T extends boolean | undefined>({
  when,
  fallback = null,
  children,
}: ShowProps<T>) {
  if (!!when) {
    return <>{children}</>
  }

  return <>{fallback}</>
}
