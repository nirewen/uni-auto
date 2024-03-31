import { Sidebar } from '@/features/admin/sidebar'
import { useAuth } from '@/hooks/useAuth'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin')({
  component: AdminLayoutComponent,
})

function AdminLayoutComponent() {
  const { user } = useAuth()

  if (!user || user.role !== 'ADMIN') {
    return history.back()
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden sm:flex-row">
      <Sidebar />
      <div className="flex h-full w-full min-w-0 flex-col overflow-auto rounded-3xl border border-neutral-800">
        <Outlet />
      </div>
    </div>
  )
}
