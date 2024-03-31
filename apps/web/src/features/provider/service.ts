import { useAxios } from '@/lib/api'
import { Provider } from './types'

export function getAllProviders() {
  const api = useAxios()

  return () => api.get<Provider[]>('/providers')
}
