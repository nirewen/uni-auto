import {
  Connection,
  ConnectionModule,
  ConnectionProfile,
  ConnectionProfileHealth,
  api,
} from '@/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useConnections = () => {
  return useQuery({
    queryKey: ['connections'],
    queryFn: () =>
      api.get<Connection[]>('/connections/@me').then((res) => res.data),
  })
}

export const useAllConnections = () => {
  return useQuery({
    queryKey: ['all', 'connections'],
    queryFn: () =>
      api.get<Connection[]>('/connections').then((res) => res.data),
  })
}

export const useConnection = (connectionId: string) => {
  return useQuery({
    queryKey: ['connection', connectionId],
    queryFn: () => {
      return api
        .get<Connection>(`/connections/${connectionId}`)
        .then((res) => res.data)
    },
    enabled: !!connectionId,
  })
}

export const useMutateConnection = <Settings>(connectionId: string) => {
  return useMutation({
    mutationKey: ['modules', 'auto-ru', 'settings'],
    mutationFn: (settings: Settings) => {
      return api.patch('/connections/auto-ru/settings', {
        connectionId,
        settings,
      })
    },
  })
}

export const useDeleteConnection = (connectionId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['connection'],
    mutationFn: () => {
      return api.delete(`/connections/${connectionId}`).then(() => {
        queryClient.invalidateQueries({ queryKey: ['connections'] })
      })
    },
  })
}

export const useConnectionSettings = <Settings>(
  connectionId: string,
  slug: string,
) => {
  return useQuery({
    queryKey: ['connections', connectionId, slug, 'settings'],
    queryFn: () =>
      api
        .get<
          ConnectionModule<Settings>
        >(`/connections/${connectionId}/${slug}/settings`)
        .then((res) => res.data),
  })
}

export const useConnectionProfile = (
  connectionId: string,
  forced?: boolean,
) => {
  return useQuery({
    queryKey: ['connections', connectionId, 'profile'],
    queryFn: () => {
      return api
        .get<ConnectionProfile>(`/connections/${connectionId}/profile`, {
          params: { forced },
        })
        .then((res) => res.data)
    },
  })
}

export const useConnectionHealth = (connectionId: string) => {
  return useQuery({
    queryKey: ['connections', connectionId, 'health'],
    queryFn: () => {
      return api
        .get<ConnectionProfileHealth>(`/connections/${connectionId}/health`)
        .then((res) => res.data)
    },
    enabled: !!connectionId,
    retry: false,
  })
}
