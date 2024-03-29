import { Paginated, Queue, api } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useQueue = (pagination: {
  pageIndex: number
  pageSize: number
}) => {
  return useQuery({
    queryKey: ['queue', pagination],
    queryFn: async () => {
      return api
        .get<Paginated<Queue>>('/queue', {
          params: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
          },
        })
        .then((res) => res.data)
    },
    placeholderData: keepPreviousData,
  })
}
