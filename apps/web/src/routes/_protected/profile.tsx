import { Sidebar } from '@/features/profile/sidebar'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/profile')({
  component: ProfileLayoutComponent,
})

function ProfileLayoutComponent() {
  return (
    <div className="flex h-full w-full flex-col-reverse overflow-hidden rounded-xl border border-neutral-800 sm:flex-row">
      <Sidebar />
      <div className="flex h-full w-full min-w-0 flex-col">
        <Outlet />
      </div>
    </div>
  )
}
