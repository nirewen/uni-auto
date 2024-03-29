import { PaginationState } from '@tanstack/react-table'
import React from 'react'
import useDebounce from '../useDebounce'

export const useTablePagination = () => {
  const [raw, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const pagination = useDebounce(raw, 500)

  return [pagination, [raw, setPagination]] as const
}
