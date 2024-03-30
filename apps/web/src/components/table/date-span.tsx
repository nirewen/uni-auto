import { formatDate } from 'date-fns'

export function DateSpan({ date }: { date: string }) {
  return (
    <span className="text-nowrap">{formatDate(date, 'dd/MM/yyyy HH:mm')}</span>
  )
}
