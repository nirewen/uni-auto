import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

import { TableQuery } from '@/lib/api'

import { Show } from '@/components/flow/show'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/features/admin/users/columns'

import { DataTableContext } from '@/context/data-table-context'
import { useTableFilter } from '@/hooks/table/useTableFilter'
import { useTablePagination } from '@/hooks/table/useTablePagination'
import { useTableSorting } from '@/hooks/table/useTableSorting'
import { useUsers } from '@/hooks/useUsers'

export const Route = createFileRoute('/_protected/admin/users')({
  component: UsersComponent,
})

function UsersComponent() {
  const [filter, filterState] = useTableFilter()
  const [pagination, paginationState] = useTablePagination()
  const [sorting, sortingState] = useTableSorting()

  const query = useUsers(new TableQuery({ filter, pagination, sorting }))

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Usuários</h1>
      <p className="text-gray-500">Usuários da plataforma</p>
      <Show
        when={!query.isLoading && !!query.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <DataTableContext.Provider
          value={{
            query,
            filter: filterState,
            pagination: paginationState,
            sorting: sortingState,
            refresh: () => query.refetch(),
          }}
        >
          <DataTable columns={columns} data={query.data!} />
        </DataTableContext.Provider>
      </Show>
    </div>
  )
}
