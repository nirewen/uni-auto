import { Skeleton } from '@/components/ui/skeleton'
import { ModuleSection } from '../[id]/module-section'

export function ConnectionInfoLoader() {
  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <Skeleton className="h-8 w-8 rounded-full" />
        </ModuleSection.Icon>
        <ModuleSection.Title>
          <Skeleton className="h-8 w-full" />
        </ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body>
        <Skeleton className="h-[112px]" />
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
