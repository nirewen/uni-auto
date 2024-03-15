import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div>
      <div>I'm a layout for auth</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
