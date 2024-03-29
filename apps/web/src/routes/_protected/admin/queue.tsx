import { PaginatedDataTable } from '@/components/ui/data-table.paginated'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/queue/columns'
import { useQueue } from '@/hooks/useQueue'
import { createFileRoute } from '@tanstack/react-router'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_protected/admin/queue')({
  component: QueueComponent,
})

function QueueComponent() {
  const [query, setQuery] = React.useState<string>('')
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'createdAt', desc: true },
  ])
  const queue = useQueue({ pagination, sorting, query })

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Fila</h1>
      <p className="text-gray-500">Fila das execuções da plataforma</p>
      <Show
        when={!queue.isLoading && !!queue.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <PaginatedDataTable
          columns={columns}
          data={queue.data!}
          query={{
            value: query,
            update: setQuery,
          }}
          pagination={{
            value: pagination,
            update: setPagination,
          }}
          sorting={{
            value: sorting,
            update: setSorting,
          }}
        />
      </Show>
    </div>
  )
}
