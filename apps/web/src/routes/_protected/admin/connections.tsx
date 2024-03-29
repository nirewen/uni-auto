import { createFileRoute } from '@tanstack/react-router'

import { columns } from '@/features/admin/connections/columns'

import { PaginatedDataTable } from '@/components/ui/data-table.paginated'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Show } from '@/components/util/show'
import { useAllConnections } from '@/hooks/useConnections'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_protected/admin/connections')({
  component: ConnectionsComponent,
})

function ConnectionsComponent() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'profile_displayName', desc: false },
  ])
  const connections = useAllConnections(pagination, sorting)

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Conexões</h1>
      <p className="text-gray-500">Conexões adicionadas na plataforma</p>
      <Show
        when={!connections.isLoading && !!connections.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <ScrollArea className="h-full">
          <PaginatedDataTable
            columns={columns}
            data={connections.data!}
            pagination={pagination}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
          />
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </Show>
    </div>
  )
}
