import { DataTable } from '@/components/ui/data-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/invites/columns'
import { useAllInvites } from '@/hooks/useInvites'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/invites')({
  component: InvitesComponent,
})

function InvitesComponent() {
  const invites = useAllInvites()

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Convites</h1>
      <p className="text-gray-500">Convites da plataforma</p>
      <Show
        when={!invites.isLoading && !!invites.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <ScrollArea>
          <DataTable
            columns={columns}
            data={invites.data!}
            initialSorting={[
              {
                id: 'createdAt',
                desc: false,
              },
            ]}
          />
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </Show>
    </div>
  )
}
