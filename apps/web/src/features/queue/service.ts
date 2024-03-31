import { useAxios } from '@/lib/api'
import { Paginated, TableQuery } from '@/lib/types'
import { Queue } from './types'

export function getAllQueueEntries(params: TableQuery) {
  const api = useAxios()

  return () => api.get<Paginated<Queue>>('/queue', { params })
}
