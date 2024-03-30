import { Copy } from '@/components/copy'
import { DateSpan } from '@/components/table/date-span'
import { SortingHeader } from '@/components/table/sorting-header'
import { JsonData } from '@/features/queue/json-data'
import { QueueEntryStatus } from '@/features/queue/status'
import { UserCard } from '@/features/users/user-card'
import { Queue } from '@/lib/api'
import { ColumnDef } from '@tanstack/react-table'

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
    size: 38,
    cell: ({ row }) => (
      <UserCard mini user={row.original.connection.user!} controls />
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
