import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/queue')({
  component: () => <div>Hello /_protected/admin/queue!</div>
})