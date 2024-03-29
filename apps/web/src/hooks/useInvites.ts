import { DataTableFilter, InviteCode, Paginated, api } from '@/lib/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useAllInvites = ({
  pagination,
  sorting,
  query,
}: DataTableFilter) => {
  return useQuery({
    queryKey: ['invites', { pagination, sorting, query }],
    queryFn: async () => {
      return api
        .get<Paginated<InviteCode>>(`/invites`, {
          params: {
            query,
            pagination: {
              page: pagination.pageIndex + 1,
              limit: pagination.pageSize,
            },
            sorting: {
              id: sorting[0].id,
              desc: sorting[0].desc,
            },
          },
        })
        .then((res) => res.data)
    },
    placeholderData: keepPreviousData,
  })
}
