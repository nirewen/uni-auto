import { TableQuery } from '@/lib/types'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import * as service from './service'

export function useConnections() {
  return useQuery({
    queryKey: ['connections'],
    queryFn: service.getCurrentUserConnections(),
    select: (res) => res.data,
  })
}

export function useAllConnections(params: TableQuery) {
  return useQuery({
    queryKey: ['connections', params],
    queryFn: service.getAllConnections(params),
    select: (res) => ({
      meta: res.data.meta,
      items: res.data.items.map((item) => ({
        ...item,
        profile: item.profile && {
          ...item.profile,
          avatarUrl: service.getAvatarUrl(item.id),
        },
      })),
    }),
    placeholderData: keepPreviousData,
  })
}

export function useConnection(connectionId: string) {
  return useQuery({
    queryKey: ['connection', connectionId],
    queryFn: service.getConnectionById(connectionId),
    select: (res) => res.data,
    enabled: !!connectionId,
  })
}

export function useUpdateConnectionModuleSettings<Settings>(
  connectionId: string,
  moduleSlug: string,
) {
  return useMutation({
    mutationKey: ['modules', moduleSlug, 'settings'],
    mutationFn: service.updateConnectionModuleSettings({
      connectionId,
      moduleSlug,
    }),
  })
}

export function useDeleteConnection(connectionId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['connection'],
    mutationFn: service.deleteConnectionById(connectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] })
    },
  })
}

export function useConnectionSettings<Settings>(
  connectionId: string,
  slug: string,
) {
  return useQuery({
    queryKey: ['connections', connectionId, slug, 'settings'],
    queryFn: service.getConnectionSettings<Settings>(connectionId, slug),
    select: (res) => res.data,
  })
}

export function useConnectionProfile(connectionId: string, forced?: boolean) {
  return useQuery({
    queryKey: ['connections', connectionId, 'profile'],
    queryFn: service.getConnectionProfile(connectionId, forced),
    select: (res) => ({
      ...res.data,
      avatarUrl: service.getAvatarUrl(connectionId),
    }),
  })
}

export const useConnectionHealth = (connectionId: string) => {
  return useQuery({
    queryKey: ['connections', connectionId, 'health'],
    queryFn: service.getConnectionHealth(connectionId),
    select: (res) => res.data,
    enabled: !!connectionId,
    retry: false,
  })
}
