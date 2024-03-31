import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

import { useAuth } from '@/hooks/useAuth'
import { TableQuery } from '@/lib/types'
import * as service from './service'

export function useLoggedInUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: service.getLoggedInUser(),
    select: (res) => res.data,
    enabled: false,
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: service.getCurrentUser(),
    select: (res) => res.data,
  })
}

export function useDeleteCurrentUser() {
  const { signOut } = useAuth()

  return useMutation({
    mutationKey: ['user'],
    mutationFn: service.deleteCurrentUser(),
    onSuccess: signOut,
  })
}

export function useAllUsers(params: TableQuery) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: service.getAllUsers(params),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
  })
}
