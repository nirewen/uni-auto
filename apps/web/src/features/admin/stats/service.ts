import { useAxios } from '@/lib/api'
import { Stats } from './types'

export function getStats() {
  const api = useAxios()

  return () => api.get<Stats>('/stats')
}
