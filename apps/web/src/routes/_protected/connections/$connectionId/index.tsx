import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/connections/$connectionId/')({
  component: ConnectionIdComponent,
})

function ConnectionIdComponent() {
  return (
    <div className="flex flex-col flex-1 gap-4 p-4 border border-solid rounded-md bg-neutral-900 border-neutral-800">
      <h1 className="text-3xl font-semibold">Módulos</h1>
      <div className="flex flex-col gap-1">
        <span>
          Os módulos são responsáveis por executar as tarefas de forma
          automática e periódica.
        </span>
        <span className="text-muted-foreground">
          Selecione um módulo para configurar suas opções.
        </span>
      </div>
    </div>
  )
}
