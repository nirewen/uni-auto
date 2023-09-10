import { AxiosError } from 'axios'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { TokenPair, User, api } from '@/lib/api'
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(3, { message: 'Usuário deve ter no mínimo 3 caracteres' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type FormValues = z.infer<typeof schema>

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const signIn = useSignIn()
  const [invalid, setInvalid] = useState<string | null>(null)
  const navigate = useNavigate()

  async function onSubmit(formData: FormValues) {
    try {
      const {
        data: { tokens, user },
      } = await api.post<{ user: User; tokens: TokenPair }>('/auth/signup', {
        username: formData.username,
        password: formData.password,
      })

      signIn({
        token: tokens.access_token,
        expiresIn: 15 * 60 * 1000,
        refreshToken: tokens.refresh_token,
        refreshTokenExpireIn: 7 * 24 * 60 * 60 * 1000,
        tokenType: 'Bearer',
        authState: user,
      })

      navigate('/')
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
    <div className='flex flex-col items-center self-center flex-1 gap-2 px-12'>
      <h1 className='text-4xl font-bold'>Criar conta</h1>
      <h4 className='text-center text-muted-foreground'>
        Insira seu usuário e senha abaixo
        <br />
        para criar sua conta
      </h4>
      <hr />
      <form className='flex flex-col w-full gap-2' onSubmit={handleSubmit(onSubmit)}>
        <label className='flex flex-col gap-1'>
          <span className='text-sm'>Usuário</span>
          <Input type='text' className='bg-neutral-900' {...register('username')} />
          <small className='h-4 text-red-400'>{errors.username?.message}</small>
        </label>
        <label className='flex flex-col gap-1'>
          <span className='text-sm'>Senha</span>
          <Input type='password' className='bg-neutral-900' {...register('password')} />
          <small className='h-4 text-red-400'>{errors.password?.message}</small>
        </label>
        <Button className='w-full mt-4' type='submit'>
          Criar conta
        </Button>
        {invalid && <p className='h-0 -mt-2 text-red-400'>{invalid}</p>}
      </form>
    </div>
  )
}
