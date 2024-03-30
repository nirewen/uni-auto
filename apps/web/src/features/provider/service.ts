import { api } from '@/lib/api'
import { Provider } from './types'

export function getAllProviders() {
  return () => api.get<Provider[]>('/providers')
}
