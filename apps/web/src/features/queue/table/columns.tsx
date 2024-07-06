import { ColumnDef } from '@tanstack/react-table'

import { Copy } from '@/components/copy'
import { DateSpan } from '@/components/table/date-span'
import { SortingHeader } from '@/components/table/sorting-header'

import { ConnectionProfileCard } from '@/features/connections/components/connection-card/connection-profile'
import { UserCard } from '@/features/users/components/user-card'
import { JsonData } from '../components/json-data'
import { QueueEntryStatus } from '../components/status'
import { Queue } from '../types'

export const columns: ColumnDef<Queue>[] = [
  {
    accessorKey: 'status',
    header: '',
    size: 32,
    cell: ({ row }) => <QueueEntryStatus status={row.original.status} />,
  },
  {
    accessorKey: 'connection',
    header: '',
    size: 62,
    cell: ({ row }) => (
      <div className="flex gap-1">
        <UserCard mini user={row.original.connection.user!} />
        <ConnectionProfileCard mini connection={row.original.connection} />
      </div>
    ),
  },
  {
    accessorKey: 'data',
    size: 114,
    header: 'Data',
    cell: ({ row }) => <JsonData object={row.original.data} />,
  },
  {
    accessorKey: 'endpoint',
    size: 170,
    header: 'Endpoint',
    cell: ({ row }) => <Copy content={row.original.endpoint} />,
  },
  {
    accessorKey: 'createdAt',
    size: 150,
    header: ({ column }) => (
      <SortingHeader column={column}>Criado em</SortingHeader>
    ),
    cell: ({ row }) => <DateSpan date={row.original.createdAt} />,
  },
]
