import { Paginated, Queue, TableQuery, api } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useQueue = (params: TableQuery) => {
  return useQuery({
    queryKey: ['queue', params],
    queryFn: async () => {
      return api
        .get<Paginated<Queue>>('/queue', { params })
        .then((res) => res.data)
    },
    placeholderData: keepPreviousData,
  })
}
