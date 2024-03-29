import { PaginatedDataTable } from '@/components/ui/data-table.paginated'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/modules/columns'
import { useAllModules } from '@/hooks/useModules'
import { TableQuery } from '@/lib/api'
import { createFileRoute } from '@tanstack/react-router'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/_protected/admin/modules')({
  component: ModulesComponent,
})

function ModulesComponent() {
  const [filter, setFilter] = React.useState<string>('')
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'name', desc: true },
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
        <ScrollArea className="h-full">
          <PaginatedDataTable
            columns={columns}
            data={modules.data!}
            filter={{
              value: filter,
              update: setFilter,
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
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </Show>
    </div>
  )
}
