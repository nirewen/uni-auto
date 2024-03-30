import { api } from '@/lib/api'
import { Paginated, TableQuery } from '@/lib/types'
import {
  Connection,
  ConnectionModule,
  ConnectionProfile,
  ConnectionProfileHealth,
} from './types'

export function getCurrentUserConnections() {
  return () => api.get<Connection[]>('/connections/@me')
}

export function getAllConnections(params: TableQuery) {
  return () => api.get<Paginated<Connection>>('/connections', { params })
}

export function getConnectionById(connectionId: string) {
  return () => api.get<Connection>(`/connections/${connectionId}`)
}

export function updateConnectionModuleSettings<Settings>(
  module: string,
  connectionId: string,
) {
  return (settings: Settings) =>
    api.patch(`/connections/${module}/settings`, {
      connectionId,
      settings,
    })
}

export function deleteConnectionById(connectionId: string) {
  return () => api.delete(`/connections/${connectionId}`)
}

export function getConnectionSettings<Settings>(
  connectionId: string,
  module: string,
) {
  return () =>
    api.get<ConnectionModule<Settings>>(
      `/connections/${connectionId}/${module}/settings`,
    )
}

export function getConnectionProfile(connectionId: string, forced?: boolean) {
  return () =>
    api.get<ConnectionProfile>(`/connections/${connectionId}/profile`, {
      params: { forced },
    })
}

export function getConnectionHealth(connectionId: string) {
  return () =>
    api.get<ConnectionProfileHealth>(`/connections/${connectionId}/health`)
}
