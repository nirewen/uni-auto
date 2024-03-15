import { Navbar } from '@/components/navbar'
import { useAuth } from '@/context/auth-provider'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_protected')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <Loader2 className="w-8 h-8 m-auto animate-spin" />
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
