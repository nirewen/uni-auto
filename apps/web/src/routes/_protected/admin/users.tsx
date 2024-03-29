import { DataTable } from '@/components/ui/data-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/users/columns'
import useDebounce from '@/hooks/useDebounce'
import { useUsers } from '@/hooks/useUsers'
import { TableQuery } from '@/lib/api'
import { createFileRoute } from '@tanstack/react-router'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_protected/admin/users')({
  component: UsersComponent,
})

function UsersComponent() {
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
  const users = useUsers(new TableQuery({ filter, pagination, sorting }))

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Usuários</h1>
      <p className="text-gray-500">Usuários da plataforma</p>
      <Show
        when={!users.isLoading && !!users.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <ScrollArea className="h-full">
          <DataTable
            columns={columns}
            data={users.data!}
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
