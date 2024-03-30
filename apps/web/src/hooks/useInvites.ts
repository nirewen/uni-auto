import { InviteCode, Paginated, TableQuery, api, refreshToken } from '@/lib/api'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

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

export const useConsumeInvite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['invites', 'consume'],
    mutationFn: async (code: string) => {
      return api.post(`/invites/use/${code}`).then((res) => res.data)
    },
    onSuccess: async () => {
      await refreshToken()

      queryClient.invalidateQueries({ queryKey: ['token-user'] })
      queryClient.invalidateQueries({ queryKey: ['connections'] })
      queryClient.invalidateQueries({ queryKey: ['modules'] })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setTimeout(() => {
          queryClient.resetQueries({ queryKey: ['invites', 'consume'] })
        }, 5000)
      }
    },
  })
}

export const useMyInvites = (params: TableQuery) => {
  return useQuery({
    queryKey: ['invites/@me', params],
    queryFn: async () => {
      return api
        .get<Paginated<InviteCode>>(`/invites/@me`, { params })
        .then((res) => res.data)
    },
    placeholderData: keepPreviousData,
  })
}
