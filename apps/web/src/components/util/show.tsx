export type ShowProps<T extends boolean> = {
  when: T
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function Show<T extends boolean>({
  when,
  fallback = null,
  children,
}: ShowProps<T>) {
  if (when) {
    return <>{children}</>
  }

  return <>{fallback}</>
}
