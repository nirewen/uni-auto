import { Navigate, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: AuthIndexComponent,
})

function AuthIndexComponent() {
  return <Navigate to="/auth/login" replace />
}
