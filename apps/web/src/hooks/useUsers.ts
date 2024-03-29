import { DataTableFilter, Paginated, User, api } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useUsers = ({ pagination, sorting, query }: DataTableFilter) => {
  return useQuery({
    queryKey: ['users', { pagination, sorting, query }],
    queryFn: () =>
      api
        .get<Paginated<User>>('/users', {
          params: {
            query,
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
