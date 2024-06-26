import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

import { Show } from '@/components/flow/show'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/features/invites/table/columns'

import { CreateInviteForm } from '@/features/admin/invites/create-invite-form'
import { useAllInvites } from '@/features/invites/hooks'
import { useTableFilter } from '@/hooks/table/useTableFilter'
import { useTablePagination } from '@/hooks/table/useTablePagination'
import { useTableSorting } from '@/hooks/table/useTableSorting'
import { DataTableContext } from '@/hooks/useDataTable'
import { TableQuery } from '@/lib/types'

export const Route = createFileRoute('/_protected/admin/invites')({
  component: InvitesComponent,
})

function InvitesComponent() {
  const [filter, filterState] = useTableFilter()
  const [pagination, paginationState] = useTablePagination()
  const [sorting, sortingState] = useTableSorting()

  const query = useAllInvites(new TableQuery({ filter, pagination, sorting }))

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Convites</h1>
          <p className="text-gray-500">Convites da plataforma</p>
        </div>
        <div className="flex flex-col gap-2">
          <CreateInviteForm />
        </div>
      </div>
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
