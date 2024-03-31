import { Outlet, createFileRoute } from '@tanstack/react-router'

import { Sidebar } from '@/features/profile/sidebar'

export const Route = createFileRoute('/_protected/profile')({
  component: ProfileLayoutComponent,
})

function ProfileLayoutComponent() {
  return (
    <div className="flex h-full w-full flex-col-reverse gap-2 overflow-hidden sm:flex-row">
      <Sidebar />
      <div className="flex h-full w-full min-w-0 flex-col overflow-auto rounded-3xl border border-neutral-800">
        <Outlet />
      </div>
    </div>
  )
}
