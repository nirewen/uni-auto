import { ActiveStatus } from '@/components/active-status'
import { DateSpan } from '@/components/table/date-span'
import { SortingHeader } from '@/components/table/sorting-header'
import { UserCard } from '@/features/users/user-card'
import { RoleIcon } from '@/features/users/user-role'
import { User } from '@/lib/api'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'active',
    size: 1,
    header: 'Cargo',
    cell: ({ row }) => <ActiveStatus active={row.original.active} />,
  },
  {
    accessorKey: 'role',
    size: 1,
    header: '',
    cell: ({ row }) => <RoleIcon role={row.original.role} />,
  },
  {
    accessorKey: 'displayName',
    size: 400,
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
    size: 160,
    header: ({ column }) => (
      <SortingHeader column={column}>Criado em</SortingHeader>
    ),
    cell: ({ row }) => <DateSpan date={row.original.createdAt} />,
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'updatedAt',
    size: 170,
    header: ({ column }) => {
      return <SortingHeader column={column}>Atualizado em</SortingHeader>
    },
    cell: ({ row }) => <DateSpan date={row.original.updatedAt} />,
    sortingFn: 'datetime',
  },
]
