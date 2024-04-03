import { TableQuery } from '@/lib/types'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { useRefreshToken } from '@/hooks/useAuth'
import { AxiosError } from 'axios'
import * as service from './service'

export function useConsumeInvite() {
  const { mutateAsync: refreshToken } = useRefreshToken()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['invites', 'consume'],
    mutationFn: service.consumeInvite(),
    onSuccess: async () => {
      await refreshToken()

      queryClient.invalidateQueries({ queryKey: ['user'] })
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

export function useCreateInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['invites', 'create'],
    mutationFn: service.createInvite(),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['invites'] })
    },
  })
}

export function useAllInvites(params: TableQuery) {
  return useQuery({
    queryKey: ['invites'],
    queryFn: service.getAllInvites(params),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
  })
}

export function useMyInvites(params: TableQuery) {
  return useQuery({
    queryKey: ['invites/@me'],
    queryFn: service.getMyInvites(params),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
  })
}
