import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

import { TableQuery } from '@/lib/api'

import { DataTable } from '@/components/ui/data-table'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/queue/columns'

import { useTableFilter } from '@/hooks/table/useTableFilter'
import { useTablePagination } from '@/hooks/table/useTablePagination'
import { useTableSorting } from '@/hooks/table/useTableSorting'
import { useQueue } from '@/hooks/useQueue'

export const Route = createFileRoute('/_protected/admin/queue')({
  component: QueueComponent,
})

function QueueComponent() {
  const [filter, filterState] = useTableFilter()
  const [pagination, paginationState] = useTablePagination()
  const [sorting, sortingState] = useTableSorting()
  const queue = useQueue(new TableQuery({ filter, pagination, sorting }))

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Fila</h1>
      <p className="text-gray-500">Fila das execuções da plataforma</p>
      <Show
        when={!queue.isLoading && !!queue.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <DataTable
          columns={columns}
          data={queue.data!}
          filter={filterState}
          pagination={paginationState}
          sorting={sortingState}
        />
      </Show>
    </div>
  )
}
