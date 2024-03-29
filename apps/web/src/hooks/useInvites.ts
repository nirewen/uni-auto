import { InviteCode, Paginated, TableQuery, api } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useAllInvites = (params: TableQuery) => {
  return useQuery({
    queryKey: ['invites', params],
    queryFn: async () => {
      return api
        .get<Paginated<InviteCode>>(`/invites`, { params })
        .then((res) => res.data)
    },
    placeholderData: keepPreviousData,
  })
}
