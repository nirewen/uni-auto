import { Sidebar } from '@/features/admin/sidebar'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin')({
  component: AdminLayoutComponent,
})

function AdminLayoutComponent() {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-xl border border-neutral-800">
      <Sidebar />
      <div className="flex h-full w-full min-w-0 flex-col">
        <Outlet />
      </div>
    </div>
  )
}
