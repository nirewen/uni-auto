import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteConnection } from '@/features/connections/hooks'
import { useNavigate, useParams } from '@tanstack/react-router'
import { ModuleSection } from '../[id]/module-section'

export function ConnectionInfoFooter() {
  const params = useParams({ from: '/_protected/connections/$connectionId' })
  const { mutateAsync: deleteConnection } = useDeleteConnection(
    params.connectionId,
  )
  const navigate = useNavigate()

  return (
    <ModuleSection.Root>
      <ModuleSection.Body>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-bold text-white">Excluir conexão</h4>
            <span className="text-sm text-muted-foreground">
              Ao excluir essa conexão, todos os módulos associados a ela serão
              excluídos e pararão de funcionar.
            </span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700" variant="ghost">
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Você tem certeza que deseja excluir essa conexão? <br />
                  Ao excluir essa conexão, ela será desvinculada de sua conta e
                  todos os módulos associados - junto com suas configurações -
                  serão excluídos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    toast.promise(
                      deleteConnection().then(() => {
                        navigate({ to: '/connections' })
                      }),
                      {
                        loading: 'Excluindo conexão...',
                        success: 'Conexão excluída com sucesso!',
                        error: 'Ocorreu um erro ao excluir a conexão',
                      },
                    )
                  }}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
