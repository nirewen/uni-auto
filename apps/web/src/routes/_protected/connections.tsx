import { useConnections } from '@/hooks/useConnections'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet'

export const Route = createFileRoute('/_protected/connections')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const { isLoading } = useConnections()

  return (
    <div className="relative flex-1 gap-2 md:grid-cols-[28%_auto] md:grid-rows-1 md:overflow-hidden">
      <Helmet title={`UniAuto \u007C Conexões`} />
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden rounded-md border border-solid border-neutral-800 backdrop-blur-sm">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      )}
      <div className="flex w-full flex-col gap-2 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
