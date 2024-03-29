import { DataTable } from '@/components/ui/data-table'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/queue/columns'
import useDebounce from '@/hooks/useDebounce'
import { useQueue } from '@/hooks/useQueue'
import { TableQuery } from '@/lib/api'
import { createFileRoute } from '@tanstack/react-router'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_protected/admin/queue')({
  component: QueueComponent,
})

function QueueComponent() {
  const [filterState, setFilter] = React.useState<string>('')
  const [paginationState, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sortingState, setSorting] = React.useState<SortingState>([
    { id: 'createdAt', desc: true },
  ])
  const filter = useDebounce(filterState, 500)
  const pagination = useDebounce(paginationState, 500)
  const sorting = useDebounce(sortingState, 500)
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
      </Show>
    </div>
  )
}
