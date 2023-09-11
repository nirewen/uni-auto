import { User, api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => api.get<User>('/users/@me').then(res => res.data),
    enabled: !!localStorage.getItem('access_token'),
  })
}
