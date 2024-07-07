import { Show } from '@/components/flow/show'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { MonthlyChart } from '@/features/admin/stats/components/monthly-chart'
import { useStats } from '@/features/admin/stats/hooks'
import { CardTitle } from '@/features/connections/components/[id]/module-section/card/card.title'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/')({
  component: DashboardComponent,
})

function DashboardComponent() {
  const stats = useStats()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-500">Bem-vindo ao painel de administração</p>

      <div className="mt-3 flex h-96 gap-2">
        <Show
          when={!stats.isLoading && !!stats.data}
          fallback={<Loader2Icon className="m-auto h-8 w-8 animate-spin" />}
        >
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Usuários</CardTitle>
              <CardDescription>
                Exibindo total de usuários nos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MonthlyChart data={stats.data?.users.slice(-6)} />
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Fila</CardTitle>
              <CardDescription>
                Exibindo total de entradas na fila nos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MonthlyChart data={stats.data?.queue.slice(-6)} />
            </CardContent>
          </Card>
        </Show>
      </div>
    </div>
  )
}
