import { Outlet, createLazyFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet'

export const Route = createLazyFileRoute('/_protected/connections')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="relative flex-1 gap-2 md:grid-cols-[28%_auto] md:grid-rows-1 md:overflow-hidden">
      <Helmet title={`UniAuto \u007C Conexões`} />
      <div className="flex w-full flex-col gap-2 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
