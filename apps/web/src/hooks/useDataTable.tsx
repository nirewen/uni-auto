import React from 'react'

import { UseQueryResult } from '@tanstack/react-query'
import { PaginationState, SortingState } from '@tanstack/react-table'

type TableContextProps<TData> = {
  query: UseQueryResult<TData, Error>
  filter: readonly [string, React.Dispatch<React.SetStateAction<string>>]
  pagination: readonly [
    PaginationState,
    React.Dispatch<React.SetStateAction<PaginationState>>,
  ]
  sorting: readonly [
    SortingState,
    React.Dispatch<React.SetStateAction<SortingState>>,
  ]
  refresh: () => void
}

export const DataTableContext = React.createContext<TableContextProps<any>>(
  null!,
)

export const useDataTable = () => React.useContext(DataTableContext)
