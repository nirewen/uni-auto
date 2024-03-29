import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Paginated } from '@/lib/api'
import { cn } from '@/lib/utils'
import { Show } from '../util/show'
import { DebouncedInput } from './input.debounced'
import { Pagination } from './pagination'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: Paginated<TData>
  pagination?: {
    value: PaginationState
    update: React.Dispatch<React.SetStateAction<PaginationState>>
  }
  sorting?: {
    value: SortingState
    update: React.Dispatch<React.SetStateAction<SortingState>>
  }
  query?: {
    value: string
    update: React.Dispatch<React.SetStateAction<string>>
  }
}

export function PaginatedDataTable<TData, TValue>({
  columns,
  data,
  query,
  sorting,
  pagination,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: data.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: sorting?.update,
    manualPagination: true,
    rowCount: data.meta.totalItems,
    onPaginationChange: pagination?.update,
    state: {
      sorting: sorting?.value,
      pagination: pagination?.value,
      globalFilter: query?.value,
    },
    defaultColumn: {
      size: 0,
      minSize: 0,
    },
  })

  return (
    <div className="p-1">
      <Show when={!!query || !!pagination}>
        <div className="flex items-center gap-2">
          <Show when={!!query}>
            <DebouncedInput
              type="search"
              placeholder="Pesquisar..."
              value={query?.value ?? ''}
              onChange={(value) => query?.update(value as string)}
              className="flex-1"
              debounce={500}
            />
          </Show>
          <Show when={!!pagination}>
            <Pagination
              className={cn({ 'mr-auto': !!query })}
              table={table}
              setPagination={pagination!.update}
            />
          </Show>
        </div>
      </Show>
      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() || undefined }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="px-4 py-2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
