import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Balancer } from 'react-wrap-balancer'

import { Calendar, DollarSign, Loader2, RotateCw, Save } from 'lucide-react'

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
import { ModuleSection } from '@/features/connections/components/:id/module-section'
import { RUSettings } from '@/features/connections/components/:id/settings/ru'
import useAutosave from '@/hooks/useAutosave'
import {
  useConnectionSettings,
  useMutateConnection,
} from '@/hooks/useConnections'
import { useDeleteModule, useToggleModule } from '@/hooks/useModules'
import { Connection } from '@/lib/api'

export type ConnectionModule = {
  id: string
  settings: Settings
  enabled: boolean
  updatedAt: string
  createdAt: string
  connection: Connection
}

export type Settings = {
  days: Day[]
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
    icon: <RotateCw className='w-4 h-4' />,
    value: '2 vezes',
    subtitle: 'no total',
  },
  {
    title: 'Última execução',
    icon: <Calendar className='w-4 h-4' />,
    value: '20/08/2023',
    subtitle: 'Domingo',
  },
  {
    title: 'Saldo atual',
    icon: <DollarSign className='w-4 h-4' />,
    value: 'R$ 35,00',
    subtitle: (
      <span>
        Lembrete de recarga <b>ativado</b>
      </span>
    ),
  },
]

export const AutoRU = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutateConnection(id!)
  const {
    data,
    isLoading: isSettingsLoading,
    isError,
  } = useConnectionSettings(id!, 'auto-ru')
  const { mutate: toggle } = useToggleModule(id!)
  const { mutate: deleteModule } = useDeleteModule(id!)
  const [settings, setSettings] = useState<Settings>()

  const saved = useAutosave({ data: settings!, onSave: mutate })

  useEffect(() => {
    if (data && !data.settings.days) {
      data.settings.days = []
    }

    setSettings(data?.settings)
  }, [data])

  function onSave(newSettings: Settings) {
    setSettings(settings => ({ ...settings, ...newSettings }))
  }

  if (isError) {
    return <Navigate to={`/connections/${id}`} />
  }

  if (isSettingsLoading || !settings) {
    return (
      <div className='relative flex flex-col w-full gap-2 overflow-auto'>
        <ModuleSection>
          <ModuleSection.Header>
            <ModuleSection.Title>Configurações</ModuleSection.Title>
            <ModuleSection.Subtitle>
              Configurações para esse módulo
            </ModuleSection.Subtitle>
            <ModuleSection.Options>
              <Button
                className='bg-neutral-800 border-neutral-700'
                variant='outline'
                size='icon'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  <Save className='w-4 h-4' />
                )}
                <span className='sr-only'>Salvar</span>
              </Button>
            </ModuleSection.Options>
          </ModuleSection.Header>
          <ModuleSection.Body>
            <Skeleton className='h-[292px]' />
          </ModuleSection.Body>
        </ModuleSection>
        <ModuleSection>
          <ModuleSection.Body>
            <div className='flex justify-between gap-2'>
              <div className='flex flex-col gap-1'>
                <h4 className='text-lg font-bold text-white'>
                  Desativar módulo
                </h4>
                <span className='text-sm text-muted-foreground'>
                  Ao desativar esse módulo, ele não será mais executado
                </span>
              </div>
              <Button className='bg-neutral-700' variant='ghost'>
                Desativar
              </Button>
            </div>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-1'>
                <h4 className='text-lg font-bold text-white'>Excluir módulo</h4>
                <span className='text-sm text-muted-foreground'>
                  Ao excluir esse módulo, ele será desassociado de sua conexão e
                  todas as configurações serão apagadas
                </span>
              </div>
              <Button className='bg-red-600 hover:bg-red-700' variant='ghost'>
                Excluir
              </Button>
            </div>
          </ModuleSection.Body>
        </ModuleSection>
      </div>
    )
  }

  return (
    <div className='relative flex flex-col w-full gap-2 overflow-auto'>
      {!data?.enabled && (
        <div className='absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden border border-solid rounded-md bg-neutral-950 bg-opacity-70 backdrop-blur-md border-neutral-800'>
          <h1 className='text-2xl font-bold'>Módulo desativado</h1>
          <div className='flex flex-col max-w-sm gap-8 mt-4'>
            <Balancer className='text-center'>
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
      <ModuleSection>
        <ModuleSection.Header>
          <ModuleSection.Title>Configurações</ModuleSection.Title>
          <ModuleSection.Subtitle>
            Configurações para esse módulo
          </ModuleSection.Subtitle>
          <ModuleSection.Options>
            <TooltipProvider>
              <Tooltip disableHoverableContent open={saved}>
                <TooltipTrigger asChild>
                  <Button
                    className='bg-neutral-800 border-neutral-700'
                    variant='outline'
                    size='icon'
                    onClick={() => mutate(settings)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                      <Save className='w-4 h-4' />
                    )}
                    <span className='sr-only'>Salvar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='left'>
                  <p>Salvo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ModuleSection.Options>
        </ModuleSection.Header>
        <ModuleSection.Body>
          <RUSettings settings={settings} onSave={onSave} />
        </ModuleSection.Body>
      </ModuleSection>
      <ModuleSection>
        <ModuleSection.Body>
          <div className='flex justify-between gap-2'>
            <div className='flex flex-col gap-1'>
              <h4 className='text-lg font-bold text-white'>Desativar módulo</h4>
              <span className='text-sm text-muted-foreground'>
                Ao desativar esse módulo, ele não será mais executado
              </span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='bg-neutral-700' variant='ghost'>
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
                      toggle({ slug: 'auto-ru', enabled: false })
                    }}
                  >
                    Desativar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-1'>
              <h4 className='text-lg font-bold text-white'>Excluir módulo</h4>
              <span className='text-sm text-muted-foreground'>
                Ao excluir esse módulo, ele será desassociado de sua conexão e
                todas as configurações serão apagadas
              </span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='bg-red-600 hover:bg-red-700' variant='ghost'>
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
                      deleteModule({ slug: 'auto-ru' })

                      navigate(`/connections/${id}`)
                    }}
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </ModuleSection.Body>
      </ModuleSection>
    </div>
  )
}
