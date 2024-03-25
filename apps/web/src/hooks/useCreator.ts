import { sleep } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'

export type DiscordUser = {
  id: string
  username: string
  avatar: string
  discriminator: string
  public_flags: number
  premium_type: number
  flags: number
  banner: null
  accent_color: number
  global_name: string
  avatar_decoration_data: null
  banner_color: string
}

export function useCreatorDiscord(enabled: boolean) {
  return useQuery({
    queryKey: ['creator', 'discord'],
    queryFn: async () => {
      await sleep(2000)

      return JSON.parse(
        import.meta.env.VITE_CREATOR_DISCORD as string,
      ) as DiscordUser
    },
    enabled,
  })
}
