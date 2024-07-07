import { useQuery } from '@tanstack/react-query'

import * as service from './service'

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: service.getStats(),
    select: (res) => res.data,
  })
}
