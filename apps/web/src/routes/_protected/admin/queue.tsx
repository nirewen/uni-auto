import { PaginatedDataTable } from '@/components/ui/data-table.paginated'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/queue/columns'
import { useQueue } from '@/hooks/useQueue'
import { createFileRoute } from '@tanstack/react-router'
import { PaginationState } from '@tanstack/react-table'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_protected/admin/queue')({
  component: QueueComponent,
})

function QueueComponent() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const queue = useQueue(pagination)

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Módulos</h1>
      <p className="text-gray-500">Módulos da plataforma</p>
      <Show
        when={!queue.isLoading && !!queue.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <PaginatedDataTable
          columns={columns}
          data={queue.data!}
          pagination={pagination}
          setPagination={setPagination}
        />
      </Show>
    </div>
  )
}
