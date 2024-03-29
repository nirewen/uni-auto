import { Paginated, User, api } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { PaginationState, SortingState } from '@tanstack/react-table'

export const useUsers = (
  pagination: PaginationState,
  sorting: SortingState,
) => {
  return useQuery({
    queryKey: ['users', pagination, sorting],
    queryFn: () =>
      api
        .get<Paginated<User>>('/users', {
          params: {
            pagination: {
              page: pagination.pageIndex + 1,
              limit: pagination.pageSize,
            },
            sorting: {
              id: sorting[0].id,
              desc: sorting[0].desc,
            },
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  })
}
