import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: AuthLayoutComponent,
})

function AuthLayoutComponent() {
  return (
    <main className="flex w-full max-w-7xl flex-1 flex-col gap-2 p-2 dark:text-white md:m-auto md:max-h-[90vh]">
      <Outlet />
    </main>
  )
}
