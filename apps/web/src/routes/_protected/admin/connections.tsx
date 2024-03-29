import { createFileRoute } from '@tanstack/react-router'

import { columns } from '@/features/admin/connections/columns'

import { DataTable } from '@/components/ui/data-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Show } from '@/components/util/show'
import { useAllConnections } from '@/hooks/useConnections'
import useDebounce from '@/hooks/useDebounce'
import { TableQuery } from '@/lib/api'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_protected/admin/connections')({
  component: ConnectionsComponent,
})

function ConnectionsComponent() {
  const [filterState, setFilter] = React.useState<string>('')
  const [paginationState, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sortingState, setSorting] = React.useState<SortingState>([
    { id: 'profile_displayName', desc: true },
  ])
  const filter = useDebounce(filterState, 500)
  const pagination = useDebounce(paginationState, 500)
  const sorting = useDebounce(sortingState, 500)
  const connections = useAllConnections(
    new TableQuery({ filter, pagination, sorting }),
  )

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
            filter={{
              value: filterState,
              update: setFilter,
            }}
            pagination={{
              value: paginationState,
              update: setPagination,
            }}
            sorting={{
              value: sortingState,
              update: setSorting,
            }}
          />
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </Show>
    </div>
  )
}
