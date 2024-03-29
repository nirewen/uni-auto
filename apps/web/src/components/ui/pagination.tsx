import { cn } from '@/lib/utils'
import { PaginationState, Table } from '@tanstack/react-table'
import { ArrowLeftIcon, ArrowRightIcon, MoreHorizontalIcon } from 'lucide-react'
import { For } from '../util/for'
import { Show } from '../util/show'
import { Button } from './button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'

type PaginationProps = {
  className: string
  table: Table<any>
  pagination: PaginationState
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
}

export function Pagination({
  className,
  table,
  pagination,
  setPagination,
}: PaginationProps) {
  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex

  function getPageRange(): number[] {
    const range = [...new Array(pageCount).keys()].slice(1, -1)

    return range
  }

  function showPage(page: number): boolean {
    if (pageCount > 7) {
      if (currentPage < 4 && page < 5) {
        return true
      }

      if (currentPage >= pageCount - 4 && page >= pageCount - 5) {
        return true
      }

      if (currentPage >= 4 && page > currentPage - 2) {
        return [currentPage - 1, currentPage, currentPage + 1].includes(page)
      }
    } else {
      return true
    }

    return false
  }

  function showEllipsis(side: 'left' | 'right'): boolean {
    return (
      (side === 'left' && currentPage >= 4 && pageCount > 7) ||
      (side === 'right' && currentPage <= pageCount - 5 && pageCount > 7)
    )
  }

  return (
    <div
      className={cn('flex items-center justify-end space-x-2 py-2', className)}
    >
      <Button
        variant="outline"
        className="w-10 px-0"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        className={cn('px-0 w-10', {
          'bg-neutral-300 text-black': currentPage === 0,
        })}
        size="sm"
        onClick={() => table.firstPage()}
      >
        1
      </Button>
      <Show when={showEllipsis('left')}>
        <Button variant="outline" className="w-10 px-0" size="sm" disabled>
          <MoreHorizontalIcon />
        </Button>
      </Show>
      <For each={getPageRange()}>
        {(pageNumber) => {
          return (
            <Show when={showPage(pageNumber)}>
              <Button
                variant="outline"
                className={cn('w-10 px-0', {
                  'bg-neutral-300 text-black': currentPage === pageNumber,
                })}
                size="sm"
                onClick={() =>
                  setPagination((prev) => ({ ...prev, pageIndex: pageNumber }))
                }
              >
                {pageNumber + 1}
              </Button>
            </Show>
          )
        }}
      </For>
      <Show when={showEllipsis('right')}>
        <Button variant="outline" className="w-10 px-0" size="sm" disabled>
          <MoreHorizontalIcon />
        </Button>
      </Show>
      <Show when={pageCount > 1}>
        <Button
          variant="outline"
          className={cn('w-10 px-0', {
            'bg-neutral-300 text-black': currentPage === pageCount - 1,
          })}
          size="sm"
          onClick={() => table.lastPage()}
        >
          {pageCount}
        </Button>
      </Show>
      <Button
        variant="outline"
        className="w-10 px-0"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ArrowRightIcon className="h-5 w-5" />
      </Button>
      <Select
        onValueChange={(value) =>
          setPagination((prev) => ({ ...prev, pageSize: parseInt(value) }))
        }
        value={pagination.pageSize.toString()}
      >
        <SelectTrigger className="w-16">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Por página</SelectLabel>
            <For each={[10, 15, 20, 30, 50]}>
              {(value) => {
                return <SelectItem value={value.toString()}>{value}</SelectItem>
              }}
            </For>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
