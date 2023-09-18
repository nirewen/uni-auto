import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth-provider'
import { useMutateUser, useUser } from '@/hooks/useUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type FormValues = z.infer<typeof schema>

export const Form = () => {
  const { data } = useUser()
  const { signOut } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync } = useMutateUser()

  async function onSubmit(formData: FormValues) {
    await mutateAsync({ password: formData.password })

    signOut()
  }

  if (!data) return null

  return (
    <form
      className='flex flex-col w-full gap-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className='flex flex-col gap-1'>
        <span>Nome</span>
        <Input disabled value={data.username} />
        <small className='h-4'>
          Alterar nome de usuário está desativado no momento. Contate um
          administrador
        </small>
      </label>

      <label className='flex flex-col gap-1'>
        <span>Senha</span>
        <Input
          type='password'
          placeholder='Não alterada'
          {...register('password')}
        />
        <small className='h-4 text-red-400'>{errors.password?.message}</small>
      </label>
      <Button className='w-full mt-4' type='submit'>
        Atualizar conta
      </Button>
    </form>
  )
}
