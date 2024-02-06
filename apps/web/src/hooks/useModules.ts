import { Module, api } from '@/lib/api'
import { ConnectionModule } from '@/routes/(protected)/connections/[id]/[module_slug]/modules/auto-ru'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useModules = (provider: string) => {
  return useQuery({
    queryKey: ['modules', provider],
    queryFn: async () =>
      api.get<Module[]>(`/modules/${provider}`).then((res) => res.data),
  })
}

export const useToggleModule = (connectionId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['modules', connectionId],
    mutationFn: async ({ slug, enabled }: { slug: string; enabled: boolean }) =>
      api
        .post<ConnectionModule>(`/modules/${slug}/toggle`, {
          connection: connectionId,
          enabled,
        })
        .then(async (res) => {
          await Promise.all([
            queryClient.refetchQueries({
              queryKey: ['connection', connectionId],
              exact: true,
            }),
            queryClient.refetchQueries({
              queryKey: ['connections', connectionId, slug, 'settings'],
              exact: true,
            }),
          ])

          return res.data
        }),
  })
}

export const useDeleteModule = (connectionId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['modules', connectionId],
    mutationFn: async ({ slug }: { slug: string }) =>
      api
        .post<ConnectionModule>(`/modules/${slug}/delete`, {
          connection: connectionId,
        })
        .then(async (res) => {
          await Promise.all([
            queryClient.refetchQueries({
              queryKey: ['connection', connectionId],
              exact: true,
            }),
            queryClient.refetchQueries({
              queryKey: ['connections', connectionId, slug, 'settings'],
              exact: true,
            }),
          ])

          return res.data
        }),
  })
}
