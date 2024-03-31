import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDataTable } from '@/hooks/useDataTable'
import { Paginated } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Show } from '../flow/show'
import { RefreshButton } from '../table/refresh-button'
import { Input } from './input'
import { Pagination } from './pagination'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: Paginated<TData>
  emptyMessage?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = 'Nenhum resultado',
}: DataTableProps<TData, TValue>) {
  const {
    filter: [filter, setFilter],
    sorting: [sorting, setSorting],
    pagination: [pagination, setPagination],
  } = useDataTable()

  const table = useReactTable({
    data: data.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: setSorting,
    manualPagination: true,
    rowCount: data.meta.totalItems,
    onPaginationChange: setPagination,
    state: {
      sorting: sorting,
      pagination: pagination,
      globalFilter: filter,
    },
    defaultColumn: {
      size: 0,
      minSize: -1,
    },
  })

  return (
    <div className="flex flex-col overflow-hidden p-1">
      <Show when={!!filter || !!pagination}>
        <div className="flex items-center gap-2">
          <Show when={filter !== undefined}>
            <Input
              type="search"
              placeholder="Pesquisar..."
              value={filter ?? ''}
              onChange={(e) => setFilter!(e.target.value)}
              className="flex-1"
            />
          </Show>
          <Show when={!!pagination}>
            <Pagination
              className={cn({ 'mr-auto': !!filter })}
              table={table}
              pagination={pagination}
              setPagination={setPagination!}
            />
          </Show>
          <RefreshButton />
        </div>
      </Show>
      <div className="flex flex-col overflow-auto rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const size =
                    header.getSize() < 0 ? 0 : header.getSize() || undefined

                  return (
                    <TableHead
                      key={header.id}
                      className={cn({ 'px-0': header.getSize() < 0 })}
                      style={{ width: size }}
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
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
