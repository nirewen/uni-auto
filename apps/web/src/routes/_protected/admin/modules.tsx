import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/modules')({
  component: () => <div>Hello /_protected/admin/modules!</div>
})