import { AxiosError } from 'axios'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { api } from '@/lib/api'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const schema = z.object({
  login: z
    .string()
    .min(3, { message: 'Login deve ter no mínimo 3 caracteres' })
    .regex(/^\d*$/, { message: 'Login deve conter apenas números' }),
  senha: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type FormValues = z.infer<typeof schema>

export function UFSM() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const [invalid, setInvalid] = useState<string | null>(null)
  const navigate = useNavigate()

  async function onSubmit(formData: FormValues) {
    try {
      const { data } = await api.post('/ufsm/connect', {
        login: formData.login,
        senha: formData.senha,
      })

      navigate(`/connections/${data.id}`)
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
    <div className='flex md:flex-row flex-col md:gap-8 gap-4 md:pl-4 md:pr-16 px-4 py-4 bg-[#21376b] rounded-lg'>
      <div className='self-center w-48 overflow-hidden rounded-sm invert'>
        <img
          src='https://www.ufsm.br/app/uploads/sites/607/2022/04/UFSM_principal_solido-preto.png'
          alt=''
        />
      </div>
      <form
        className='flex flex-col w-full gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className='flex flex-col gap-1'>
          <span className='text-sm'>CPF ou Matrícula</span>
          <Input
            type='text'
            className='bg-neutral-900 bg-opacity-60'
            {...register('login')}
          />
          <small className='h-4 text-red-400'>{errors.login?.message}</small>
        </label>
        <label className='flex flex-col gap-1'>
          <span className='text-sm'>Senha</span>
          <Input
            type='password'
            className='bg-neutral-900 bg-opacity-60'
            {...register('senha')}
          />
          <small className='h-4 text-red-400'>{errors.senha?.message}</small>
        </label>
        <Button className='w-full mt-4' type='submit'>
          Adicionar conexão
        </Button>
        {invalid && <p className='h-0 -mt-2 text-red-400'>{invalid}</p>}
      </form>
    </div>
  )
}
