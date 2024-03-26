import logo from '@/assets/Logo.svg'
import { useAuth } from '@/context/auth-provider'
import { Navigate, createFileRoute } from '@tanstack/react-router'
import { Form } from './-form'

export const Route = createFileRoute('/auth/login/')({
  component: LoginRoute,
})

function LoginRoute() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex h-96 flex-1 flex-col rounded-md border border-solid border-neutral-600 bg-neutral-900 md:flex-row">
      <div className="flex flex-col justify-between bg-neutral-800 p-10 md:flex-1">
        <span className="flex gap-2">
          <img src={logo} alt="Logo" className="h-6 w-6" />
          <b className="font-bold">university automation</b>
        </span>

        <b className="hidden font-bold md:inline">
          Ferramenta para automatizar afazeres da sua universidade
        </b>
      </div>
      <div className="flex flex-1 md:p-12">
        <Form />
      </div>
    </div>
  )
}
