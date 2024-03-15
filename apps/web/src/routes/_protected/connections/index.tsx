import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/connections/')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="flex flex-col flex-1 gap-4 p-4 border border-solid rounded-md bg-neutral-900 border-neutral-800">
      <h1 className="text-3xl font-semibold">Conexões</h1>
      <div className="flex flex-col gap-1">
        <span>
          Com conexões, você pode ter mais de um perfil anexado ao seu perfil
        </span>
        <span>Selecione uma conexão para prosseguir</span>
      </div>
    </div>
  )
}
