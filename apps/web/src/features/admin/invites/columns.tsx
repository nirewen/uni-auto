import { ActiveStatus } from '@/components/active-status'
import { Copy } from '@/components/copy'
import { For } from '@/components/util/for'
import { UserCard } from '@/features/connections/user/user-card'
import { InviteUseCard } from '@/features/invites/invite-use'
import { InviteCode } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<InviteCode>[] = [
  {
    accessorKey: 'enabled',
    header: () => <span className="-mr-4">Ativo</span>,
    cell: ({ row }) => {
      return (
        <div className="-mr-4 flex items-center gap-1">
          <ActiveStatus active={row.original.active} />
        </div>
      )
    },
  },
  {
    accessorKey: 'code',
    header: 'Código',
    cell: ({ row }) => {
      return <Copy content={row.original.code} />
    },
  },
  {
    accessorKey: 'role',
    header: 'Papel',
    cell: ({ row }) => {
      return (
        <span className="rounded-md bg-neutral-800 p-2 font-mono">
          {row.original.role}
        </span>
      )
    },
  },
  {
    accessorKey: 'uses',
    header: 'Usos/Max',
    cell: ({ row }) => {
      return `${row.original.uses.length}/${row.original.maxUses}`
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => {
      return formatDate(row.original.createdAt)
    },
  },
  {
    accessorKey: 'uses',
    header: 'Usos',
    cell: ({ row }) => {
      return (
        <For each={row.original.uses}>
          {(use) => {
            return <InviteUseCard key={use.id} use={use} />
          }}
        </For>
      )
    },
  },
  {
    accessorKey: 'createdBy',
    header: () => <span className="text-nowrap">Criado por</span>,
    cell: ({ row }) => <UserCard mini user={row.original.createdBy} />,
  },
  {
    accessorKey: 'assignedTo',
    header: () => <span className="text-nowrap">Atribuído a</span>,
    cell: ({ row }) => <UserCard mini user={row.original.assignedTo} />,
  },
  {
    accessorKey: 'usableBy',
    header: () => <span className="text-nowrap">Usável por</span>,
    cell: ({ row }) => <UserCard mini user={row.original.usableBy} />,
  },
]
