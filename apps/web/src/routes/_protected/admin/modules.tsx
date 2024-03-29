import { DataTable } from '@/components/ui/data-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/modules/columns'
import useDebounce from '@/hooks/useDebounce'
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
          <DataTable
            columns={columns}
            data={modules.data!}
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
