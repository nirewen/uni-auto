import { User, api } from '@/lib/api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => api.get<User>('/users/@me').then((res) => res.data),
  })
}

export const useMutateUser = () => {
  return useMutation({
    mutationKey: ['user'],
    mutationFn: (data: { password: string }) => {
      return api.patch<User>('/users/@me', data).then((res) => res.data)
    },
  })
}
