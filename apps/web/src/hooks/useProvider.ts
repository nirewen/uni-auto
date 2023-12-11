import { ProviderProfile, api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useProviderProfile = (connectionId: string) => {
  return useQuery({
    queryKey: ['provider', 'profile', connectionId],
    queryFn: () => {
      return api
        .get<ProviderProfile>(`/providers/profile/${connectionId}`)
        .then((res) => res.data)
    },
  })
}
