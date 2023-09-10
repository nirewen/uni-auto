import { Navbar } from '@/components/navbar'
import { useAuth } from '@/context/auth-provider'
import { Loader2 } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <Loader2 className='w-8 h-8 m-auto animate-spin' />
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
