import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { Helmet } from 'react-helmet'

export interface WrapperProps {
  provider: string
  children: React.ReactNode
}

export function Wrapper({ provider, children }: WrapperProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md border border-solid border-neutral-800 bg-neutral-900 p-2">
      <Helmet title={`UniAuto \u007C Nova conexão - ${provider}`} />
      <div className="flex items-center gap-2">
        <Button
          className="gap-2 pl-2"
          variant="ghost"
          onClick={() => history.back()}
        >
          <ChevronLeft />
          Voltar
        </Button>
        <span className="text-muted-foreground">
          Adicionando conexão para {provider}
        </span>
      </div>
      {children}
      <span className="mt-6 text-muted-foreground">
        Esse serviço não está associado com {provider} e não armazena os dados
        informados acima
      </span>
    </div>
  )
}
