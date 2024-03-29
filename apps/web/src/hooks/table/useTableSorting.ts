import { SortingState } from '@tanstack/react-table'
import React from 'react'
import useDebounce from '../useDebounce'

export const useTableSorting = (
  initialState: SortingState = [{ id: 'createdAt', desc: true }],
) => {
  const [raw, setSorting] = React.useState<SortingState>(initialState)
  const sorting = useDebounce(raw, 500)

  return [sorting, [raw, setSorting]] as const
}
