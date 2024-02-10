import { Connection, ConnectionProfile, api } from '@/lib/api'
import {
  ConnectionModule,
  Settings,
} from '@/routes/(protected)/connections/[id]/[module_slug]/modules/auto-ru'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useConnections = () => {
  return useQuery({
    queryKey: ['connections'],
    queryFn: () =>
      api.get<Connection[]>('/connections/@me').then((res) => res.data),
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
  })
}

export const useMutateConnection = (connectionId: string) => {
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

export const useConnectionSettings = (connectionId: string, slug: string) => {
  return useQuery({
    queryKey: ['connections', connectionId, slug, 'settings'],
    queryFn: () =>
      api
        .get<ConnectionModule>(`/connections/${connectionId}/${slug}/settings`)
        .then((res) => res.data),
  })
}

export const useConnectionProfile = (connectionId: string) => {
  return useQuery({
    queryKey: ['connections', connectionId, 'profile'],
    queryFn: () => {
      return api
        .get<ConnectionProfile>(`/connections/${connectionId}/profile`)
        .then((res) => res.data)
    },
  })
}
