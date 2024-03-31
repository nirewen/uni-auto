import { Loader2Icon, RotateCwIcon } from 'lucide-react'

import { useDataTable } from '@/hooks/useDataTable'
import { Show } from '../flow/show'
import { Button } from '../ui/button'

export function RefreshButton() {
  const { query, refresh } = useDataTable()

  return (
    <Button onClick={refresh} variant="outline" size="icon">
      <Show when={query.isLoading || query.isRefetching}>
        <Loader2Icon className="m-auto h-5 w-5 animate-spin" />
      </Show>
      <Show when={!query.isLoading && !query.isRefetching}>
        <RotateCwIcon className="m-auto h-5 w-5" />
      </Show>
    </Button>
  )
}
