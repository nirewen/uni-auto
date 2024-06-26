import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/')({
  component: DashboardComponent,
})

function DashboardComponent() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-500">Bem-vindo ao painel de administração</p>
    </div>
  )
}
