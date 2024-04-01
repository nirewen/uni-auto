import { Button } from '@/components/ui/button'
import { MailIcon } from 'lucide-react'

export function MainHero() {
  function handleButtonClick() {
    window.location.href = import.meta.env.VITE_MAILTODEV
  }

  return (
    <div
      id="main-hero"
      className="flex flex-col items-center gap-2 py-16 md:px-48 lg:px-96"
    >
      <h1 className="text-center text-5xl font-bold">
        Automação para sua Universidade
      </h1>
      <div className="flex max-w-96 flex-col gap-1 text-center text-lg">
        Pode deixar o alarme no passado...
        <br />
        agora é só configurar e esquecer.
      </div>
      <div className="mt-5">
        <Button onClick={handleButtonClick}>
          <MailIcon className="mr-2 h-5 w-5" />
          Pedir um convite
        </Button>
      </div>
      <span className="text-center text-sm text-muted-foreground">
        Utilize seu email institucional!
      </span>
    </div>
  )
}
