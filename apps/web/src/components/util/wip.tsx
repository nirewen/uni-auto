import { ModuleSection } from '@/features/connections/components/[id]/module-section'
import { ModuleSectionHeader } from '@/features/connections/components/[id]/module-section/module-section.header'
import { ConstructionIcon } from 'lucide-react'

export function WIP() {
  return (
    <div className="md:mx-32 lg:mx-64">
      <ModuleSection.Root>
        <ModuleSectionHeader>
          <ModuleSection.Icon>
            <ConstructionIcon className="h-6 w-6" />
          </ModuleSection.Icon>
          <ModuleSection.Title>Work in Progress</ModuleSection.Title>
        </ModuleSectionHeader>
        <ModuleSection.Body>
          <div className="flex flex-1 flex-col gap-2 text-neutral-200">
            <p>Essa página ainda está em construção...</p>
            <p>Tente novamente outra hora</p>
            <img
              className="rounded-md"
              src="https://http.cat/images/501.jpg"
              alt="501 - Not implemented"
            />
          </div>
        </ModuleSection.Body>
      </ModuleSection.Root>
    </div>
  )
}
