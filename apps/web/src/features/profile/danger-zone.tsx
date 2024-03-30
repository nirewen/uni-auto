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
import { ModuleSection } from '@/features/connections/components/[id]/module-section'

export function ProfileDangerZone() {
  return (
    <ModuleSection.Root>
      <ModuleSection.Body>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-bold text-white">Excluir conta</h4>
            <span className="text-sm text-muted-foreground">
              Ao excluir essa conta, tudo associado a ela será excluído. Sua
              sessão será encerrada e você será redirecionado para a página de
              login.
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
                  Você tem certeza que deseja excluir essa conta? <br />
                  Ao excluir essa conta, tudo associado a ela será excluído.
                  Todos as conexões e todos os módulos dessas conexões serão
                  excluídos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    // deleteConnection()
                    // navigate({ to: '/connections' })
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
