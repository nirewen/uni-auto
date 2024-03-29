import { SortingHeader } from '@/components/util/table.util'
import { ConnectionType } from '@/features/connections/components/connection-card/connection-type'
import { UserCard } from '@/features/connections/user/user-card'
import { Connection } from '@/lib/api'
import { ColumnDef } from '@tanstack/react-table'
import { ConnectionProfileCard } from '../../connections/components/connection-card/connection-profile'
import { ProviderCard } from '../../connections/provider/provider-card'

export const columns: ColumnDef<Connection>[] = [
  {
    accessorKey: 'profile_displayName',
    header: ({ column }) => {
      return <SortingHeader column={column}>Conexão</SortingHeader>
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
    accessorKey: 'provider',
    header: 'Provedor',
    size: 1,
    cell: ({ row }) => {
      return <ProviderCard provider={row.original.provider} />
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    size: 1,
    cell: ({ row }) => {
      return <ConnectionType type={row.original.type} />
    },
  },
]
