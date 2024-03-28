import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/invites')({
  component: () => <div>Hello /_protected/admin/invites!</div>
})