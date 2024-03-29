import { createFileRoute } from '@tanstack/react-router'

import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/features/admin/connections/columns'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Show } from '@/components/util/show'
import { useAllConnections } from '@/hooks/useConnections'
import { Loader2Icon } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/connections')({
  component: ConnectionsComponent,
})

function ConnectionsComponent() {
  const connections = useAllConnections()

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Conexões</h1>
      <p className="text-gray-500">Conexões adicionadas na plataforma</p>
      <Show
        when={!connections.isLoading && !!connections.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <ScrollArea className="h-full">
          <DataTable
            columns={columns}
            data={connections.data!}
            initialSorting={[
              {
                id: 'profile',
                desc: true,
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
