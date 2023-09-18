import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useUser } from '@/hooks/useUser'
import { Form } from './form'

export const InformacoesBasicas = () => {
  const { data } = useUser()

  if (!data)
    return (
      <div className='flex flex-col flex-1 gap-4 p-4 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
        <h1 className='text-3xl font-semibold'>Informações básicas</h1>
        <div className='flex flex-col gap-1'>
          <span>Nome</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input disabled />
              </TooltipTrigger>
              <TooltipContent>
                <p>Alterar nome de usuário está desativado no momento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    )

  return (
    <div className='flex flex-col flex-1 gap-4 p-4 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      <h1 className='text-3xl font-semibold'>Informações básicas</h1>
      <div className='flex flex-col gap-1'>
        <Form />
      </div>
    </div>
  )
}
