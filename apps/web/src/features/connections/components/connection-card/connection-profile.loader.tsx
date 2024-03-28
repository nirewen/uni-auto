import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function ConnectionProfileWideLoader() {
  return (
    <div className="flex h-14 items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 p-2">
      <Skeleton className="aspect-square h-full w-auto rounded-full" />
      <div className="flex w-full flex-col gap-1 overflow-hidden">
        <span className="text-sm">
          <Skeleton className="h-4 w-24" />
        </span>
        <span className="truncate whitespace-nowrap font-bold">
          <Skeleton className="h-5 w-48" />
        </span>
      </div>
      <Skeleton className="ml-auto aspect-square h-full w-auto rounded-full" />
    </div>
  )
}

export function ConnectionProfileLoader() {
  return (
    <Button variant="outline" size="sm" className="gap-2">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </Button>
  )
}
