import { DataTable } from '@/components/ui/data-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Show } from '@/components/util/show'
import { columns } from '@/features/admin/users/columns'
import { useUsers } from '@/hooks/useUsers'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/users')({
  component: UsersComponent,
})

function UsersComponent() {
  const users = useUsers()

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
            initialSorting={[
              {
                id: 'createdAt',
                desc: false,
              },
            ]}
          />
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </Show>
    </div>
  )
}
