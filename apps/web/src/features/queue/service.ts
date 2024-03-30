import { api } from '@/lib/api'
import { Paginated, TableQuery } from '@/lib/types'
import { Queue } from './types'

export function getAllQueueEntries(params: TableQuery) {
  return () => api.get<Paginated<Queue>>('/queue', { params })
}
