import { CardTitle } from '@/features/connections/components/[id]/module-section/card/card.title'
import { DiscordUser, useCreatorDiscord } from '@/hooks/useCreator'
import { api, refreshToken } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../../components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../components/ui/hover-card'
import { Input } from '../../components/ui/input'
import { Show } from '../../components/util/show'

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

function ActivationHelper() {
  const [open, setOpen] = useState(false)
  const creatorDiscord = useCreatorDiscord(open)

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen((v) => !v)}>
          Não tenho um código
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Código de ativação</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              Você pode pedir um código de ativação para um amigo que já usa a
              plataforma.
              <Show when={!creatorDiscord.isLoading && !!creatorDiscord.data}>
                <div>
                  ...Ou pedir diretamente ao criador do site, no Discord:
                  <DiscordUserCard user={creatorDiscord.data!} />
                </div>
              </Show>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen((v) => false)}>
            Ok, entendi
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const schema = z.object({
  code: z.string().uuid({ message: 'Código de ativação inválido' }),
})
type FormValues = z.infer<typeof schema>

export function Activation() {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const [invalid, setInvalid] = useState<string | null>(null)

  async function onSubmit(formData: FormValues) {
    try {
      const { data } = await api.post(`/invite/use/${formData.code}`)

      await refreshToken()

      queryClient.invalidateQueries({ queryKey: ['token-user'] })
      queryClient.invalidateQueries({ queryKey: ['connections'] })
      queryClient.invalidateQueries({ queryKey: ['modules'] })
    } catch (_e) {
      if (_e instanceof AxiosError) {
        setInvalid(_e.response?.data.message)

        setTimeout(() => {
          setInvalid(null)
        }, 5000)
      }
    }
  }

  return (
    <Card className="max-w-[32rem] self-center">
      <CardHeader>
        <CardTitle>Ativação da conta</CardTitle>
        <CardDescription>Sua conta não está ativada.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <span>
            Para usar a plataforma, ative sua conta informando o código de
            ativação abaixo.
          </span>
          <label className="flex flex-col gap-1">
            <span className="text-sm">Código de ativação</span>
            <Input
              type="text"
              className="bg-neutral-900 bg-opacity-60"
              inputClassName="bg-transparent"
              placeholder="AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE"
              {...register('code')}
            />
            <small className="h-4 text-red-400">{errors.code?.message}</small>
          </label>
          {invalid && <p className="-mt-4 h-0 text-red-400">{invalid}</p>}
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <ActivationHelper />
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Ativar conta
        </Button>
      </CardFooter>
    </Card>
  )
}
