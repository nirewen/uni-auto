import { api } from '@/lib/api'
import { Paginated, TableQuery } from '@/lib/types'
import { ConnectionModule } from '../connections/types'
import { Module } from './types'

export function getAllModules(params: TableQuery) {
  return () => api.get<Paginated<Module>>(`/modules`, { params })
}

export function getModulesByProvider(provider: string) {
  return () => api.get<Module[]>(`/modules/${provider}`)
}

export function toggleModuleForConnection(connectionId: string) {
  return ({ slug, enabled }: { slug: string; enabled: boolean }) =>
    api.post<ConnectionModule>(`/modules/${slug}/toggle`, {
      connection: connectionId,
      enabled,
    })
}

export const deleteModuleForConnection = (connectionId: string) => {
  return ({ slug }: { slug: string }) =>
    api.post<ConnectionModule>(`/modules/${slug}/delete`, {
      connection: connectionId,
    })
}
