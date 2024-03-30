import { TableQuery } from '@/lib/types'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { refreshToken } from '@/lib/api'
import { AxiosError } from 'axios'
import * as service from './service'

export function useConsumeInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['invites', 'consume'],
    mutationFn: service.consumeInvite(),
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

export function useAllInvites(params: TableQuery) {
  return useQuery({
    queryKey: ['invites', params],
    queryFn: service.getAllInvites(params),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
  })
}

export function useMyInvites(params: TableQuery) {
  return useQuery({
    queryKey: ['invites/@me', params],
    queryFn: service.getMyInvites(params),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
  })
}
