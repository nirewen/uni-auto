import { ActiveStatus } from '@/components/active-status'
import { Module } from '@/lib/api'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Module>[] = [
  {
    accessorKey: 'enabled',
    header: 'Ativo',
    size: 1,
    cell: ({ row }) => <ActiveStatus active={row.original.enabled} />,
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    size: 2000,
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
    cell: ({ row }) => {
      return (
        <span className="rounded-md bg-neutral-800 p-2 font-mono">
          {row.original.slug}
        </span>
      )
    },
  },
]
