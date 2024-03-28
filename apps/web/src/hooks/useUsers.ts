import { User, api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const useUsers = () => {
  return useQuery({
    queryKey: ['all', 'users'],
    queryFn: () => api.get<User[]>('/users').then((res) => res.data),
  })
}
