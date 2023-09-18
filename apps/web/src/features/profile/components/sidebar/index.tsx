import { useUser } from '@/hooks/useUser'

export function Sidebar() {
  const { data, isLoading } = useUser()

  if (isLoading)
    return (
      <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
        <span className='text-sm text-muted-foreground'>Carregando perfil</span>
      </aside>
    )

  if (!data)
    return (
      <aside className='flex flex-col flex-1 gap-2 p-2 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
        <span className='text-sm text-muted-foreground'>
          Erro ao carregar perfil
        </span>
      </aside>
    )

  return (
    <aside className='flex flex-1 gap-2 p-2 border border-solid rounded-md md:flex-col bg-neutral-900 border-neutral-800'>
      <div className='px-3 py-2 rounded-sm select-none bg-neutral-800'>
        Informações básicas
      </div>
    </aside>
  )
}
