import { Provider, api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useProviders = () => {
  return useQuery({
    queryKey: ['providers'],
    queryFn: () => {
      return api.get<Provider[]>('/providers').then(res => res.data)
    },
  })
}
