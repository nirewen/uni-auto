import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

import { TableQuery } from '@/lib/api'

import { DataTable } from '@/components/ui/data-table'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/connections/columns'

import { useTableFilter } from '@/hooks/table/useTableFilter'
import { useTablePagination } from '@/hooks/table/useTablePagination'
import { useTableSorting } from '@/hooks/table/useTableSorting'
import { useAllConnections } from '@/hooks/useConnections'

export const Route = createFileRoute('/_protected/admin/connections')({
  component: ConnectionsComponent,
})

function ConnectionsComponent() {
  const [filter, filterState] = useTableFilter()
  const [pagination, paginationState] = useTablePagination()
  const [sorting, sortingState] = useTableSorting([
    { id: 'profile_displayName', desc: false },
  ])
  const query = useAllConnections(
    new TableQuery({ filter, pagination, sorting }),
  )

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Conexões</h1>
      <p className="text-gray-500">Conexões adicionadas na plataforma</p>
      <Show
        when={!query.isLoading && !!query.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <DataTable
          columns={columns}
          data={query.data!}
          filter={filterState}
          pagination={paginationState}
          sorting={sortingState}
        />
      </Show>
    </div>
  )
}
