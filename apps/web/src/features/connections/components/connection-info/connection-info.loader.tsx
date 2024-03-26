import { Skeleton } from '@/components/ui/skeleton'
import { ModuleSection } from '../[id]/module-section'

export function ConnectionInfoLoader() {
  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <Skeleton className="h-10 w-10 rounded-md" />
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
