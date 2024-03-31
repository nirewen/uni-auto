import { formatDate } from 'date-fns'

export function DateSpan({ date }: { date: string }) {
  const formatted = !!date ? formatDate(date, 'dd/MM/yyyy HH:mm') : 'Nunca'

  return <span className="text-nowrap">{formatted}</span>
}
