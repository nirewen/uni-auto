import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Show } from '@/components/util/show'
import { ModuleSection } from '@/features/connections/components/[id]/module-section'
import {
  useConnection,
  useConnectionHealth,
  useDeleteConnection,
} from '@/hooks/useConnections'
import { Provider } from '@/lib/api'
import { cn } from '@/lib/utils'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  GraduationCapIcon,
  HeartPulseIcon,
  Loader2Icon,
  PuzzleIcon,
} from 'lucide-react'

export const Route = createFileRoute('/_protected/connections/$connectionId/')({
  component: ConnectionIdRoute,
})

function ConnectionProviderCard({ provider }: { provider?: Provider }) {
  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <GraduationCapIcon className="h-8 w-8" />
        </ModuleSection.Icon>
        <ModuleSection.Title>Provedor</ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <Show
          when={!!provider}
          fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
        >
          <div className="flex flex-1 flex-col gap-2 text-sm text-neutral-200">
            <span>Esse é o provedor da sua conexão.</span>
            <span>
              O login que você usou para adicionar a conexão ao sistema.
            </span>
            <div
              className={cn(
                'p-2 h-9 rounded-md mt-auto flex items-center gap-2',
                {
                  'bg-provider-ufsm': provider?.slug === 'ufsm',
                },
              )}
            >
              <img
                className="aspect-square h-full w-auto rounded-full bg-neutral-800"
                src={`/logos/${provider?.slug}.png`}
                alt={`Logo da ${provider?.name}`}
              />
              <span className="text-sm font-bold">{provider?.name}</span>
            </div>
          </div>
        </Show>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}

function ConnectionTypeCard({ type }: { type?: string }) {
  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <PuzzleIcon className="h-8 w-8" />
        </ModuleSection.Icon>
        <ModuleSection.Title>Tipo</ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <Show
          when={!!type}
          fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
        >
          <div className="flex flex-1 flex-col gap-2 text-sm text-neutral-200">
            <Show when={type === 'STANDARD'}>
              <span>Sua conexão suporta todas as novas funcionalidades!</span>
              <span>Além de mais segurança, tem suporte estendido!</span>
            </Show>
            <Show when={type === 'LEGACY'}>
              <span>
                Algumas coisas mudaram desde que você se conectou pela última
                vez...
              </span>
              <span>
                Refaça a conexão para ter acesso a todas as funcionalidades e
                mais segurança
              </span>
            </Show>
            <span
              className={cn('p-2 mt-auto rounded-md font-bold', {
                'bg-green-700 text-white': type === 'STANDARD',
                'bg-amber-600 text-white': type === 'LEGACY',
              })}
            >
              {type}
            </span>
          </div>
        </Show>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}

function ConnectionHealthCard({ health }: { health?: string }) {
  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <HeartPulseIcon className="h-8 w-8" />
        </ModuleSection.Icon>
        <ModuleSection.Title>Saúde</ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <Show
          when={!!health}
          fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
        >
          <div className="flex flex-1 flex-col gap-2 text-sm text-neutral-200">
            <Show when={health === 'OK'}>
              <span>Sua conexão está saudável!</span>
              <span>
                Todos os módulos que dependem dela podem executar com sucesso!
              </span>
            </Show>
            <Show when={health === 'ERROR'}>
              <span>Sua conexão está com problemas...</span>
              <span>Alguns módulos podem não funcionar corretamente.</span>
              <span>Refaça a conexão para resolver.</span>
            </Show>
            <span
              className={cn('p-2 mt-auto rounded-md font-bold', {
                'bg-green-700 text-white': health === 'OK',
                'bg-red-600 text-white': health === 'ERROR',
              })}
            >
              <Show when={health === 'OK'}>SAUDÁVEL</Show>
              <Show when={health === 'ERROR'}>PROBLEMAS</Show>
            </span>
          </div>
        </Show>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}

function ConnectionFooter() {
  const params = Route.useParams()
  const { mutate: deleteConnection } = useDeleteConnection(params.connectionId)
  const navigate = useNavigate()

  return (
    <ModuleSection.Root>
      <ModuleSection.Body>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-bold text-white">Excluir conexão</h4>
            <span className="text-sm text-muted-foreground">
              Ao excluir essa conexão, todos os módulos associados a ela serão
              excluídos e pararão de funcionar.
            </span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700" variant="ghost">
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Você tem certeza que deseja excluir essa conexão? <br />
                  Ao excluir essa conexão, ela será desvinculada de sua conta e
                  todos os módulos associados - junto com suas configurações -
                  serão excluídos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteConnection()

                    navigate({ to: '/connections' })
                  }}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}

function ConnectionIdRoute() {
  const params = Route.useParams()
  const connection = useConnection(params.connectionId)
  const health = useConnectionHealth(params.connectionId)

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <ConnectionProviderCard provider={connection.data?.provider} />
        <ConnectionTypeCard type={connection.data?.type} />
        <ConnectionHealthCard health={health.data?.status} />
      </div>
      <ConnectionFooter />
    </div>
  )
}
