import { Provider, api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export const SelectConnection = () => {
  const { data: providers, isLoading } = useQuery({
    queryKey: ['providers'],
    queryFn: () => {
      return api.get<Provider[]>('/providers').then(res => res.data)
    },
  })
  return (
    <div className='flex flex-col flex-1 gap-4 p-4 border border-solid rounded-md bg-neutral-900 border-neutral-800'>
      <h1 className='text-3xl font-semibold'>Conexões</h1>
      <div className='flex flex-col gap-1'>
        <span>
          Com conexões, você pode ter mais de um perfil anexado ao seu perfil
        </span>
        <span>Selecione uma conexão ao lado para prosseguir</span>
      </div>
      {!isLoading && providers && (
        <div className='mt-4'>
          <span>Ou, adicione uma nova conexão:</span>

          {providers.map(provider => (
            <Link
              to='./new'
              state={{ provider: provider.slug }}
              key={provider.id}
            >
              <img
                src='https://www.ufsm.br/app/uploads/2019/12/Bras%C3%A3o-horizontal.png'
                alt=''
                className='border border-solid rounded-md border-neutral-300 h-28'
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
