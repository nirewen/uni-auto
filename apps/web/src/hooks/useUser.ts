import { useAuth } from '@/context/auth-provider'
import { User, api } from '@/lib/api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => api.get<User>('/users/@me').then((res) => res.data),
  })
}

export const useDeleteUser = () => {
  const { signOut } = useAuth()

  return useMutation({
    mutationKey: ['user'],
    mutationFn: () => {
      return api.delete<User>('/users/@me').then((res) => res.data)
    },
    onSuccess: () => {
      signOut()
    },
  })
}
