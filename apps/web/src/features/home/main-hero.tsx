import { Show } from '@/components/flow/show'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { ArrowUpIcon, LogInIcon } from 'lucide-react'

export function MainHero() {
  const { isAuthenticated, loginWithProvider } = useAuth()

  function handleOpenConnections() {
    ;(
      document.querySelectorAll('#connections-popover')[0] as HTMLButtonElement
    ).click()
  }

  return (
    <div
      id="main-hero"
      className="flex flex-col items-center gap-2 py-16 md:px-48 lg:px-96"
    >
      <h1 className="text-center text-5xl font-bold">
        Automação para sua Universidade
      </h1>
      <div className="flex max-w-96 flex-col gap-1 text-center text-lg">
        Pode deixar o alarme no passado...
        <br />
        agora é só configurar e esquecer.
      </div>
      <Show when={!isAuthenticated}>
        <div className="mt-5">
          <Button onClick={() => loginWithProvider('google')}>
            <LogInIcon className="mr-2 h-5 w-5" />
            Acessar plataforma
          </Button>
        </div>
        <span className="text-center text-sm text-muted-foreground">
          Utilize seu email institucional!
        </span>
      </Show>
      <Show when={isAuthenticated}>
        <div className="mt-5">
          <Button onClick={handleOpenConnections}>
            <ArrowUpIcon className="mr-2 h-5 w-5" />
            Selecionar conexão
          </Button>
        </div>
        <span className="text-center text-sm text-muted-foreground">
          Selecione ou crie uma
          <br />
          conexão para começar
        </span>
      </Show>
    </div>
  )
}
