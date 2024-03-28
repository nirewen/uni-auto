import { DataTable } from '@/components/ui/data-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/modules/columns'
import { useAllModules } from '@/hooks/useModules'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/modules')({
  component: ModulesComponent,
})

function ModulesComponent() {
  const modules = useAllModules()

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Módulos</h1>
      <p className="text-gray-500">Módulos da plataforma</p>
      <Show
        when={!modules.isLoading && !!modules.data}
        fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
      >
        <ScrollArea>
          <DataTable columns={columns} data={modules.data!} />
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </Show>
    </div>
  )
}
