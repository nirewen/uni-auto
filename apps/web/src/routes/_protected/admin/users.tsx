import { PaginatedDataTable } from '@/components/ui/data-table.paginated'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/users/columns'
import { useUsers } from '@/hooks/useUsers'
import { createFileRoute } from '@tanstack/react-router'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_protected/admin/users')({
  component: UsersComponent,
})

function UsersComponent() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'createdAt', desc: false },
  ])
  const users = useUsers(pagination, sorting)

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Usuários</h1>
      <p className="text-gray-500">Usuários da plataforma</p>
      <Show
        when={!users.isLoading && !!users.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <ScrollArea className="h-full">
          <PaginatedDataTable
            columns={columns}
            data={users.data!}
            sorting={sorting}
            setSorting={setSorting}
            pagination={pagination}
            setPagination={setPagination}
          />
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </Show>
    </div>
  )
}
