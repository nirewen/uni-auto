import { Calendar, DollarSign, Loader2, RotateCw, Save } from 'lucide-react'
import { useAutosave } from 'react-autosave'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { ModuleSection } from '../../components/module-section'
import { RUSettings } from '../../components/settings/ru'

export type Settings = {
  days: {
    meals: number[]
    weekday: number
    restaurant: number
  }[]
}

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
  const { mutate, isLoading } = useMutation({
    mutationKey: ['modules', 'auto-ru', 'settings'],
    mutationFn: (settings: Settings) => {
      return api.patch('/connections/auto-ru', {
        connectionId: history.state.usr.connectionId,
        settings,
      })
    },
  })
  const [settings, setSettings] = useState<Settings>(
    history.state.usr.settings.settings
  )
  useAutosave({ data: settings, onSave: mutate })

  function onSave(newSettings: Settings) {
    setSettings(settings => ({ ...settings, ...newSettings }))
  }

  return (
    <div className='flex flex-col w-full gap-2 overflow-auto'>
      <ModuleSection>
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
      </ModuleSection>
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
