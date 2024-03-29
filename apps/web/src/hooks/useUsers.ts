import { Paginated, TableQuery, User, api } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useUsers = (params: TableQuery) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () =>
      api.get<Paginated<User>>('/users', { params }).then((res) => res.data),
    placeholderData: keepPreviousData,
  })
}
