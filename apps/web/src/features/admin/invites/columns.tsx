import { ActiveStatus } from '@/components/active-status'
import { Copy } from '@/components/copy'
import { For } from '@/components/util/for'
import { Show } from '@/components/util/show'
import { DateSpan, SortingHeader } from '@/components/util/table.util'
import { UserCard } from '@/features/connections/user/user-card'
import { InviteUseCard } from '@/features/invites/invite-use'
import { InviteCode } from '@/lib/api'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowRightIcon } from 'lucide-react'

export const columns: ColumnDef<InviteCode>[] = [
  {
    accessorKey: 'enabled',
    header: '',
    size: 1,
    cell: ({ row }) => <ActiveStatus active={row.original.active} />,
  },
  {
    accessorKey: 'code',
    header: 'Código',
    size: 320,
    cell: ({ row }) => {
      return (
        <Copy
          className="w-auto min-w-5"
          spanClassName="truncate"
          content={row.original.code}
        />
      )
    },
  },
  {
    accessorKey: 'role',
    size: 170,
    header: 'Papel',
    cell: ({ row }) => {
      return (
        <span className="truncate rounded-md bg-neutral-800 p-2 font-mono">
          {row.original.role}
        </span>
      )
    },
  },
  {
    accessorKey: 'uses',
    size: 100,
    header: 'Usos/Max',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <span>
            {row.original.uses.length}/{row.original.maxUses}
          </span>
          <div className="flex -space-x-3">
            <For each={row.original.uses}>
              {(use) => {
                return <InviteUseCard key={use.id} use={use} />
              }}
            </For>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'createdBy',
    size: 130,
    header: () => <span className="text-nowrap">Criado por</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <UserCard mini user={row.original.createdBy} />
        <Show
          when={
            row.original.assignedTo &&
            row.original.assignedTo.id !== row.original.createdBy.id
          }
        >
          <ArrowRightIcon className="h-4 w-4 text-neutral-500" />
          <UserCard mini user={row.original.assignedTo} />
        </Show>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => (
      <SortingHeader column={column}>Criado em</SortingHeader>
    ),
    cell: ({ row }) => <DateSpan date={row.original.createdAt} />,
    sortingFn: 'datetime',
  },
]
