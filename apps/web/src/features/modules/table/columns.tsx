import { ColumnDef } from '@tanstack/react-table'

import { ActiveStatus } from '@/components/active-status'

import { Module } from '../types'

export const columns: ColumnDef<Module>[] = [
  {
    accessorKey: 'enabled',
    header: '',
    size: 1,
    cell: ({ row }) => <ActiveStatus active={row.original.enabled} />,
  },
  {
    accessorKey: 'name',
    size: 300,
    header: 'Nome',
  },
  {
    accessorKey: 'slug',
    size: 200,
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
