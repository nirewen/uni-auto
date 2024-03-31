import { useConnection } from '@/features/connections/hooks'
import { Outlet, createLazyFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet'

export const Route = createLazyFileRoute(
  '/_protected/connections/$connectionId/$moduleSlug',
)({
  component: ModuleSlugLayoutComponent,
})

function ModuleSlugLayoutComponent() {
  const { connectionId, moduleSlug } = Route.useParams()
  const connection = useConnection(connectionId)
  const module = connection.data?.modules?.find(
    (module) => module.module.slug === moduleSlug,
  )

  return (
    <>
      <Helmet
        title={`UniAuto \u007C ${connection.data?.provider.name} - ${connection.data?.identifier} > ${module?.module.name}`}
      />
      <Outlet />
    </>
  )
}
