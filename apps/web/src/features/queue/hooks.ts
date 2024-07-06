import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { TableQuery } from '@/lib/types'
import { getAvatarUrl } from '../connections/service'
import * as service from './service'

export function useAllQueueEntries(params: TableQuery) {
  return useQuery({
    queryKey: ['queue', params],
    queryFn: service.getAllQueueEntries(params),
    select: (res) => ({
      meta: res.data.meta,
      items: res.data.items.map((item) => ({
        ...item,
        connection: item.connection && {
          ...item.connection,
          profile: item.connection.profile && {
            ...item.connection.profile,
            avatarUrl: getAvatarUrl(item.connection.id),
          },
        },
      })),
    }),
    placeholderData: keepPreviousData,
  })
}
