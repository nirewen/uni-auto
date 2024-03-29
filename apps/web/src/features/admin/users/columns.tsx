import { ActiveStatus } from '@/components/active-status'
import { DateSpan, SortingHeader } from '@/components/util/table.util'
import { UserCard } from '@/features/connections/user/user-card'
import { RoleIcon } from '@/features/connections/user/user-role'
import { User } from '@/lib/api'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'role',
    header: () => <span className="-mr-8">Cargo</span>,

    cell: ({ row }) => {
      return (
        <div className="-mr-12 flex items-center gap-1">
          <ActiveStatus active={row.original.active} />
          <RoleIcon role={row.original.role} />
        </div>
      )
    },
  },
  {
    accessorKey: 'displayName',
    header: ({ column }) => (
      <SortingHeader column={column}>Perfil</SortingHeader>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <UserCard user={row.original} />
        </div>
      )
    },
    sortingFn: (a, b, direction) => {
      if (a.original.displayName < b.original.displayName) {
        return direction === 'asc' ? -1 : 1
      }
      if (a.original.displayName > b.original.displayName) {
        return direction === 'asc' ? 1 : -1
      }
      return 0
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <SortingHeader column={column}>Criado em</SortingHeader>
    ),
    cell: ({ row }) => <DateSpan date={row.original.createdAt} />,
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return <SortingHeader column={column}>Atualizado em</SortingHeader>
    },
    cell: ({ row }) => <DateSpan date={row.original.updatedAt} />,
    sortingFn: 'datetime',
  },
]
