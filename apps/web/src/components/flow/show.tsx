export type ShowProps = {
  when: any
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function Show({ when, fallback = null, children }: ShowProps) {
  if (!!when) {
    return <>{children}</>
  }

  return <>{fallback}</>
}
