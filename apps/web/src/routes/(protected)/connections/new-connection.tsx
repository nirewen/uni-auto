import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { UFSM } from './providers/ufsm'

export const NewConnection = () => {
  const { usr: metadata } = history.state

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <div className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
        <div className='flex items-center gap-2'>
          <Button
            className='gap-2 pl-2'
            variant='ghost'
            onClick={() => history.back()}
          >
            <ChevronLeft />
            Voltar
          </Button>
          <span className='text-muted-foreground'>
            Adicionando conexão para {metadata.provider?.toUpperCase()}
          </span>
        </div>
        {children}
        <span className='mt-8 text-muted-foreground'>
          Esse serviço não está associado com {metadata.provider?.toUpperCase()}{' '}
          e não armazena os dados informados acima
        </span>
      </div>
    )
  }

  if (!metadata) {
    return <Navigate to='/connections' replace />
  }

  if (metadata.provider === 'ufsm') {
    return (
      <Wrapper>
        <UFSM />
      </Wrapper>
    )
  }

  return (
    <div>
      <h1>Provider não encontrado</h1>
    </div>
  )
}
