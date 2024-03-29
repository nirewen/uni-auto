import { DataTableFilter, Paginated, Queue, api } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useQueue = ({ pagination, sorting, query }: DataTableFilter) => {
  return useQuery({
    queryKey: ['queue', { pagination, sorting, query }],
    queryFn: async () => {
      return api
        .get<Paginated<Queue>>('/queue', {
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
        .then((res) => res.data)
    },
    placeholderData: keepPreviousData,
  })
}
