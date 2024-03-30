import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

import { TableQuery } from '@/lib/api'

import { Show } from '@/components/flow/show'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/features/profile/invites/columns'

import { DataTableContext } from '@/context/data-table-context'
import { useTableFilter } from '@/hooks/table/useTableFilter'
import { useTablePagination } from '@/hooks/table/useTablePagination'
import { useTableSorting } from '@/hooks/table/useTableSorting'
import { useMyInvites } from '@/hooks/useInvites'

export const Route = createFileRoute('/_protected/profile/invites')({
  component: InvitesComponent,
})

function InvitesComponent() {
  const [filter, filterState] = useTableFilter()
  const [pagination, paginationState] = useTablePagination()
  const [sorting, sortingState] = useTableSorting()

  const query = useMyInvites(new TableQuery({ filter, pagination, sorting }))

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Convites</h1>
      <p className="flex flex-col text-gray-500">
        <span>
          Convites para você enviar para seus amigos. Convites desbloqueiam uma
          funcionalidade da plataforma.
        </span>
        <span>Convites desbloqueiam uma funcionalidade da plataforma.</span>
        <span>Você pode ver os convites que você tem abaixo.</span>
      </p>
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
          <DataTable
            columns={columns}
            data={query.data!}
            emptyMessage="Nenhum convite pra chamar de seu"
          />
        </DataTableContext.Provider>
      </Show>
    </div>
  )
}
