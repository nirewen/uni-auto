import { BracesIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover'

type JsonDataProps = {
  object: Record<string, any>
}

export function JsonData({ object }: JsonDataProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <BracesIcon className="h-4 w-4" /> Ver JSON
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <pre>{JSON.stringify(object, null, 2)}</pre>
      </PopoverContent>
    </Popover>
  )
}
