import { TableQuery } from '@/lib/types'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import * as service from './service'

export function useAllModules(params: TableQuery) {
  return useQuery({
    queryKey: ['modules', params],
    queryFn: service.getAllModules(params),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
  })
}

export function useModulesByProvider(provider: string) {
  return useQuery({
    queryKey: ['modules', provider],
    queryFn: service.getModulesByProvider(provider),
    select: (res) => res.data,
    enabled: !!provider,
  })
}

export function useToggleModuleForConnection(connectionId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['modules', connectionId],
    mutationFn: service.toggleModuleForConnection(connectionId),
    onMutate: async ({ slug }) => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ['connection', connectionId],
          exact: true,
        }),
        queryClient.refetchQueries({
          queryKey: ['connections', connectionId, slug, 'settings'],
          exact: true,
        }),
      ])
    },
  })
}

export function useDeleteModuleForConnection(connectionId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['modules', connectionId],
    mutationFn: service.deleteModuleForConnection(connectionId),
    onMutate: async ({ slug }) => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ['connection', connectionId],
          exact: true,
        }),
        queryClient.refetchQueries({
          queryKey: ['connections', connectionId, slug, 'settings'],
          exact: true,
        }),
      ])
    },
  })
}
