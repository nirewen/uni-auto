import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/users')({
  component: () => <div>Hello /_protected/admin/users!</div>
})