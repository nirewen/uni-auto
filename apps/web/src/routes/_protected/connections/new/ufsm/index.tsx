import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Wrapper } from '../-wrapper'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { api } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
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

export const Route = createFileRoute('/_protected/connections/new/ufsm/')({
  component: UFSM,
})

function UFSM() {
  const queryClient = useQueryClient()
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

      navigate({
        to: `/connections/$connectionId/`,
        params: { connectionId: data.id },
      })

      queryClient.invalidateQueries({
        queryKey: ['connections'],
      })
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
    <Wrapper provider="UFSM">
      <div className="flex flex-col gap-4 rounded-lg bg-[#21376b] px-4 py-4 md:flex-row md:gap-8 md:pl-4 md:pr-16">
        <div className="w-48 self-center overflow-hidden rounded-sm invert">
          <img
            src="https://www.ufsm.br/app/uploads/sites/607/2022/04/UFSM_principal_solido-preto.png"
            alt=""
          />
        </div>
        <form
          className="flex w-full flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="flex flex-col gap-1">
            <span className="text-sm">CPF ou Matrícula</span>
            <Input
              type="text"
              className="bg-neutral-900 bg-opacity-60"
              inputClassName="bg-transparent"
              {...register('login')}
            />
            <small className="h-4 text-red-400">{errors.login?.message}</small>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm">Senha</span>
            <Input
              type="password"
              className="bg-neutral-900 bg-opacity-60"
              inputClassName="bg-transparent"
              {...register('senha')}
            />
            <small className="h-4 text-red-400">{errors.senha?.message}</small>
          </label>
          <Button className="mt-4 w-full" type="submit">
            Adicionar conexão
          </Button>
          {invalid && <p className="-mt-2 h-0 text-red-400">{invalid}</p>}
        </form>
      </div>
    </Wrapper>
  )
}
