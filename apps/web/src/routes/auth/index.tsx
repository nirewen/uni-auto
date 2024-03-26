import { Navigate, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return <Navigate to="/auth/login" replace />
}
