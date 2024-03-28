import { InviteCode, api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useAllInvites = () => {
  return useQuery({
    queryKey: ['invites'],
    queryFn: async () => {
      return api.get<InviteCode[]>(`/invite`).then((res) => res.data)
    },
  })
}
