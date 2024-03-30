import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { TableQuery } from '@/lib/types'
import * as service from './service'

export function useAllQueueEntries(params: TableQuery) {
  return useQuery({
    queryKey: ['queue', params],
    queryFn: service.getAllQueueEntries(params),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
  })
}
