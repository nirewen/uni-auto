import { ActiveStatus } from '@/components/active-status'
import { Module } from '@/lib/api'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Module>[] = [
  {
    accessorKey: 'enabled',
    header: () => <span className="-mr-24">Ativo</span>,
    cell: ({ row }) => {
      return (
        <div className="-mr-24 flex items-center gap-1">
          <ActiveStatus active={row.original.enabled} />
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
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
