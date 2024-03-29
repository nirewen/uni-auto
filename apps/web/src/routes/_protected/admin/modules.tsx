import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

import { TableQuery } from '@/lib/api'

import { DataTable } from '@/components/ui/data-table'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/modules/columns'

import { useTableFilter } from '@/hooks/table/useTableFilter'
import { useTablePagination } from '@/hooks/table/useTablePagination'
import { useTableSorting } from '@/hooks/table/useTableSorting'
import { useAllModules } from '@/hooks/useModules'

export const Route = createFileRoute('/_protected/admin/modules')({
  component: ModulesComponent,
})

function ModulesComponent() {
  const [filter, filterState] = useTableFilter()
  const [pagination, paginationState] = useTablePagination()
  const [sorting, sortingState] = useTableSorting([
    { id: 'enabled', desc: true },
  ])
  const modules = useAllModules(new TableQuery({ filter, pagination, sorting }))

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Módulos</h1>
      <p className="text-gray-500">Módulos da plataforma</p>
      <Show
        when={!modules.isLoading && !!modules.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <DataTable
          columns={columns}
          data={modules.data!}
          filter={filterState}
          pagination={paginationState}
          sorting={sortingState}
        />
      </Show>
    </div>
  )
}
