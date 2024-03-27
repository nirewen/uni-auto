import { Navigate, useNavigate, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Balancer } from 'react-wrap-balancer'

import {
  Calendar,
  DollarSign,
  Loader2,
  RotateCw,
  Save,
  SettingsIcon,
} from 'lucide-react'

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
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ModuleSection } from '@/features/connections/components/[id]/module-section'
import { RUSettings } from '@/features/connections/components/[id]/settings/ru'
import useAutosave from '@/hooks/useAutosave'
import {
  useConnectionSettings,
  useMutateConnection,
} from '@/hooks/useConnections'
import { useDeleteModule, useToggleModule } from '@/hooks/useModules'

export type Settings = {
  days: Day[]
  vegan: boolean
}

export type Day = {
  meals: number[]
  weekday: number
  restaurant: number
}

// @ts-ignore
const cards = [
  {
    title: 'Execuções',
    icon: <RotateCw className="h-4 w-4" />,
    value: '2 vezes',
    subtitle: 'no total',
  },
  {
    title: 'Última execução',
    icon: <Calendar className="h-4 w-4" />,
    value: '20/08/2023',
    subtitle: 'Domingo',
  },
  {
    title: 'Saldo atual',
    icon: <DollarSign className="h-4 w-4" />,
    value: 'R$ 35,00',
    subtitle: (
      <span>
        Lembrete de recarga <b>ativado</b>
      </span>
    ),
  },
]

export const AutoRU = () => {
  const { connectionId } = useParams({
    from: '/_protected/connections/$connectionId',
  })
  const navigate = useNavigate()
  const { mutate, isPending } = useMutateConnection<Settings>(connectionId!)
  const {
    data,
    isLoading: isSettingsLoading,
    isError,
  } = useConnectionSettings<Settings>(connectionId!, 'auto-ru')
  const { mutate: toggle } = useToggleModule(connectionId!)
  const { mutate: deleteModule } = useDeleteModule(connectionId!)
  const [settings, setSettings] = useState<Settings>()

  const saved = useAutosave({
    data: settings!,
    onSave: (data) => {
      if (data) mutate(data)
    },
  })

  useEffect(() => {
    if (data && !data.settings.days) {
      data.settings.days = []
    }

    setSettings(data?.settings)
  }, [data])

  function onSave(newSettings: Settings) {
    setSettings((settings) => ({ ...settings, ...newSettings }))
  }

  function onChangeVegan(vegan: boolean) {
    data!.settings.vegan = vegan

    onSave(data!.settings)
  }

  if (isError) {
    return (
      <Navigate to="/connections/$connectionId" params={{ connectionId }} />
    )
  }

  if (isSettingsLoading || !settings) {
    return (
      <div className="relative flex w-full flex-col gap-2 overflow-auto">
        <ModuleSection.Root>
          <ModuleSection.Header>
            <ModuleSection.Title>Configurações</ModuleSection.Title>
            <ModuleSection.Subtitle>
              Configurações para esse módulo
            </ModuleSection.Subtitle>
            <ModuleSection.Options>
              <Button
                className="border-neutral-700 bg-neutral-800"
                variant="outline"
                size="icon"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span className="sr-only">Salvar</span>
              </Button>
            </ModuleSection.Options>
          </ModuleSection.Header>
          <ModuleSection.Body>
            <Skeleton className="h-[292px]" />
          </ModuleSection.Body>
        </ModuleSection.Root>
        <ModuleSection.Root>
          <ModuleSection.Body>
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold text-white">
                  Desativar módulo
                </h4>
                <span className="text-sm text-muted-foreground">
                  Ao desativar esse módulo, ele não será mais executado
                </span>
              </div>
              <Button className="bg-neutral-700" variant="ghost">
                Desativar
              </Button>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold text-white">Excluir módulo</h4>
                <span className="text-sm text-muted-foreground">
                  Ao excluir esse módulo, ele será desassociado de sua conexão e
                  todas as configurações serão apagadas
                </span>
              </div>
              <Button className="bg-red-600 hover:bg-red-700" variant="ghost">
                Excluir
              </Button>
            </div>
          </ModuleSection.Body>
        </ModuleSection.Root>
      </div>
    )
  }

  return (
    <div className="relative flex w-full flex-col gap-2">
      {!data?.enabled && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden rounded-md border border-solid border-neutral-800 bg-neutral-950 bg-opacity-70 backdrop-blur-md">
          <h1 className="text-2xl font-bold">Módulo desativado</h1>
          <div className="mt-4 flex max-w-sm flex-col gap-8">
            <Balancer className="text-center">
              Esse módulo está desativado, então não é possível acessar suas
              configurações
            </Balancer>
            <Button
              onClick={() => {
                toggle({ slug: 'auto-ru', enabled: true })
              }}
            >
              Ativar módulo
            </Button>
          </div>
        </div>
      )}
      {/* <ModuleSection>
        <ModuleSection.Header>
          <ModuleSection.Title>Status</ModuleSection.Title>
          <ModuleSection.Subtitle>
            Estatísticas sobre esse módulo
          </ModuleSection.Subtitle>
        </ModuleSection.Header>
        <ModuleSection.Body>
          <ModuleSection.Card.Row>
            {cards.map((card, index) => (
              <ModuleSection.Card key={index}>
                <ModuleSection.Card.Title>
                  {card.title}
                  <ModuleSection.Card.Icon>{card.icon}</ModuleSection.Card.Icon>
                </ModuleSection.Card.Title>
                <ModuleSection.Card.Value>
                  {card.value}
                </ModuleSection.Card.Value>
                <ModuleSection.Card.Subtitle>
                  {card.subtitle}
                </ModuleSection.Card.Subtitle>
              </ModuleSection.Card>
            ))}
          </ModuleSection.Card.Row>
        </ModuleSection.Body>
      </ModuleSection> */}
      <ModuleSection.Root>
        <ModuleSection.Header>
          <ModuleSection.Icon>
            <SettingsIcon />
          </ModuleSection.Icon>
          <div className="flex flex-col md:flex-row md:items-center md:gap-2">
            <ModuleSection.Title>Configurações</ModuleSection.Title>
            <ModuleSection.Subtitle>
              Configurações para esse módulo
            </ModuleSection.Subtitle>
          </div>
          <ModuleSection.Options>
            <TooltipProvider>
              <Tooltip disableHoverableContent open={saved}>
                <TooltipTrigger asChild>
                  <Button
                    className="border-neutral-700 bg-neutral-800"
                    variant="outline"
                    size="icon"
                    onClick={() => mutate(settings)}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span className="sr-only">Salvar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Salvo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ModuleSection.Options>
        </ModuleSection.Header>
        <ModuleSection.Body>
          <RUSettings settings={settings} onSave={onSave} />
        </ModuleSection.Body>
      </ModuleSection.Root>
      <ModuleSection.Root>
        <ModuleSection.Body>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-bold text-white">Desativar módulo</h4>
              <span className="text-sm text-muted-foreground">
                Ao desativar esse módulo, ele não será mais executado
              </span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-neutral-700" variant="ghost">
                  Desativar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Você tem certeza que deseja desativar esse módulo? <br />
                    Ao desativar esse módulo, ele não será mais executado
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      toggle({ slug: 'auto-ru', enabled: !data?.enabled })
                    }}
                  >
                    Desativar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-bold text-white">Excluir módulo</h4>
              <span className="text-sm text-muted-foreground">
                Ao excluir esse módulo, ele será desassociado de sua conexão e
                todas as configurações serão apagadas
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
                    Você tem certeza que deseja excluir esse módulo? <br />
                    Ao excluir esse módulo, ele será desassociado de sua conexão
                    e todas as configurações serão apagadas
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (!data?.enabled) return

                      deleteModule({ slug: 'auto-ru' })

                      navigate({
                        to: '/connections/$connectionId',
                        params: { connectionId },
                      })
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
    </div>
  )
}
