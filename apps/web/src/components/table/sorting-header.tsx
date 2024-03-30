import { Column } from '@tanstack/react-table'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Show } from '../util/show'

type SortingHeaderProps<T> = {
  column: Column<T, unknown>
  children: React.ReactNode
}

export function SortingHeader<T>({ column, children }: SortingHeaderProps<T>) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {children}
      <Show when={column.getIsSorted() === 'asc'}>
        <ArrowUpIcon className="ml-2 h-4 w-4" />
      </Show>
      <Show when={column.getIsSorted() === 'desc'}>
        <ArrowDownIcon className="ml-2 h-4 w-4" />
      </Show>
      <Show when={!column.getIsSorted()}>
        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
      </Show>
    </Button>
  )
}
