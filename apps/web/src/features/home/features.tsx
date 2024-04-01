import { BotIcon, GraduationCapIcon, UtensilsCrossedIcon } from 'lucide-react'

import { For } from '@/components/flow/for'
import { ModuleSection } from '../connections/components/[id]/module-section'
import { ProviderCard } from '../provider/components/provider-card'
import { Provider } from '../provider/types'

export function Features() {
  const items = [
    {
      title: 'Universidades',
      icon: <GraduationCapIcon />,
      body: () => (
        <>
          <p>Universidades que a plataforma suporta.</p>
          <p>
            Se a sua universidade não estiver aqui, fique à vontade para
            contribuir!
          </p>
          <ProviderCard provider={{ name: 'UFSM', slug: 'ufsm' } as Provider} />
        </>
      ),
    },
    {
      title: 'RU Automático',
      icon: <UtensilsCrossedIcon />,
      body: () => (
        <>
          <p>
            Pra você que usa o RU todos os dias, mas esquece de agendar e tem
            que ficar entrando na fila...
            <br />É só ativar o módulo, configurar as refeições e os dias em que
            você vai usar.
          </p>
        </>
      ),
    },
  ]
  return (
    <ModuleSection.Root className="bg-opacity-40">
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <BotIcon />
        </ModuleSection.Icon>
        <ModuleSection.Title>Funcionalidades</ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <For each={items}>
            {({ title, icon, body: Body }) => (
              <ModuleSection.Root className="rounded-xl bg-neutral-800 bg-opacity-40">
                <ModuleSection.Header>
                  <ModuleSection.Icon className="bg-neutral-700">
                    {icon}
                  </ModuleSection.Icon>
                  <div className="flex flex-col">
                    <ModuleSection.Title>{title}</ModuleSection.Title>
                  </div>
                </ModuleSection.Header>
                <ModuleSection.Body>
                  <Body />
                </ModuleSection.Body>
              </ModuleSection.Root>
            )}
          </For>
        </div>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
