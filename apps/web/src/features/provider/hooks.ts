import { useQuery } from '@tanstack/react-query'

import * as service from './service'

export function useAllProviders() {
  return useQuery({
    queryKey: ['providers'],
    queryFn: service.getAllProviders(),
    select: (res) => res.data,
  })
}
