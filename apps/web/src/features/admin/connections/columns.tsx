import { SortingHeader } from '@/components/table/sorting-header'
import { ConnectionType } from '@/features/connections/components/connection-card/connection-type'
import { UserCard } from '@/features/connections/user/user-card'
import { Connection } from '@/lib/api'
import { ColumnDef } from '@tanstack/react-table'
import { ConnectionProfileCard } from '../../connections/components/connection-card/connection-profile'
import { ProviderCard } from '../../connections/provider/provider-card'

export const columns: ColumnDef<Connection>[] = [
  {
    accessorKey: 'profile_displayName',
    size: 400,
    header: ({ column, table }) => {
      return (
        <div className="flex gap-2">
          <SortingHeader column={column}>Nome</SortingHeader>
          <SortingHeader column={table.getColumn('updatedAt')!}>
            Atualizado em
          </SortingHeader>
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <UserCard mini user={row.original.user!} />
          <ConnectionProfileCard connection={row.original} />
        </div>
      )
    },
    sortingFn: (a, b, direction) => {
      if (a.original.profile!.displayName < b.original.profile!.displayName) {
        return direction === 'asc' ? -1 : 1
      }
      if (a.original.profile!.displayName > b.original.profile!.displayName) {
        return direction === 'asc' ? 1 : -1
      }
      return 0
    },
  },
  {
    accessorKey: 'updatedAt',
    header: '',
    size: -1,
    cell: '',
  },
  {
    accessorKey: 'provider',
    header: 'Provedor',
    size: 200,
    cell: ({ row }) => {
      return <ProviderCard provider={row.original.provider} />
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    size: 200,
    cell: ({ row }) => {
      return <ConnectionType type={row.original.type} />
    },
  },
]
