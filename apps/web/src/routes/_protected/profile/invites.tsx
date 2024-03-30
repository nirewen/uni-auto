import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/profile/invites')({
  component: () => <div>Hello /_protected/profile/invites!</div>
})