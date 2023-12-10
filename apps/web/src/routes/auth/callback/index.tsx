import { useAuth } from '@/context/auth-provider'
import { useEffect } from 'react'

export function Callback() {
  const { signIn } = useAuth()

  useEffect(() => {
    const url = new URL(window.location.href)
    const access_token = url.searchParams.get('access_token')
    const refresh_token = url.searchParams.get('refresh_token')

    if (access_token && refresh_token) {
      signIn({ access_token, refresh_token })
    }
  }, [])

  return (
    <div>
      Aguarde... Você será redirecionado para a página inicial em alguns
      segundos...
    </div>
  )
}
