import { Button } from '@/components/ui/button'

export function Form() {
  function loginWithProvider(provider: string) {
    window.location.pathname = `/api/auth/${provider}/login`
  }

  return (
    <div className='flex flex-col items-center flex-1 gap-2 px-4 mt-12 md:mt-0 md:self-center md:px-12'>
      <h1 className='text-4xl font-bold text-center'>Acessar conta</h1>
      <h4 className='text-center text-muted-foreground'>
        Escolha uma das opções abaixo
        <wbr /> para acessar sua conta
      </h4>
      <hr />
      <Button
        variant='outline'
        className='self-stretch bg-white text-black'
        onClick={() => loginWithProvider('google')}
      >
        Login com Google
      </Button>
    </div>
  )
}
