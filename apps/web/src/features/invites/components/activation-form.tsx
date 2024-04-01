import { ModuleSection } from '@/features/connections/components/[id]/module-section'
import { DiscordUser } from '@/hooks/useCreator'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar'
import { Button } from '../../../components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../../components/ui/hover-card'
import { Input } from '../../../components/ui/input'
import { useConsumeInvite } from '../hooks'

type DiscordUserCardProps = {
  user: DiscordUser
}

function DiscordUserCard({ user }: DiscordUserCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@{user.username}</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`}
            />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm">{user.global_name}</h4>
            <h4 className="text-sm font-semibold">@{user.username}</h4>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

const schema = z.object({
  code: z.string(),
})
type FormValues = z.infer<typeof schema>

export function Activation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const consume = useConsumeInvite()

  function onSubmit(formData: FormValues) {
    consume.mutate(formData.code)
  }

  return (
    <ModuleSection.Root className="w-full self-center">
      <ModuleSection.Header>
        <div className="flex flex-col">
          <ModuleSection.Title>Ativação da conta</ModuleSection.Title>
          <ModuleSection.Subtitle>
            Sua conta não está ativada.
          </ModuleSection.Subtitle>
        </div>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <form className="flex flex-col gap-4">
          <span>
            Para usar a plataforma, ative sua conta informando o código de
            ativação abaixo.
          </span>
          <label className="flex flex-col gap-1">
            <span className="text-sm">Código de ativação</span>
            <Input
              type="text"
              className="bg-neutral-950 bg-opacity-60"
              inputClassName="bg-transparent"
              placeholder="AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE"
              {...register('code')}
            />
            <small className="h-4 text-red-400">{errors.code?.message}</small>
          </label>
          {consume.isError && consume.error instanceof AxiosError && (
            <p className="-mt-4 h-0 text-red-400">
              {consume.error.response?.data.message}
            </p>
          )}
        </form>
      </ModuleSection.Body>
      <ModuleSection.Footer className="justify-end gap-2">
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Ativar conta
        </Button>
      </ModuleSection.Footer>
    </ModuleSection.Root>
  )
}
