import { WIP } from '@/components/util/wip'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/profile/')({
  component: ProfileComponent,
})

function ProfileComponent() {
  return <WIP />
}
