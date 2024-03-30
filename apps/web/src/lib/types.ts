import { PaginationState, SortingState } from '@tanstack/react-table'

export interface TokenPair {
  access_token: string
  refresh_token: string
}

export type Paginated<T> = {
  items: T[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}

export type TableQueryDto = {
  filter: string
  pagination: PaginationState
  sorting: SortingState
}
export class TableQuery {
  filter: string
  pagination: { page: number; limit: number }
  sorting: { id: string; desc: boolean }

  constructor({ pagination, sorting, filter }: TableQueryDto) {
    this.filter = filter
    this.pagination = {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    }
    this.sorting = {
      id: sorting[0].id,
      desc: sorting[0].desc,
    }
  }
}
