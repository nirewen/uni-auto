import { For } from '@/components/util/for'
import { Link } from '@tanstack/react-router'
import {
  HomeIcon,
  LinkIcon,
  MailIcon,
  PackageIcon,
  PlayIcon,
  UsersIcon,
} from 'lucide-react'

export function Sidebar() {
  const links = [
    { to: '/admin/', label: 'Home', icon: HomeIcon },
    { to: '/admin/users', label: 'Usuários', icon: UsersIcon },
    { to: '/admin/connections', label: 'Conexões', icon: LinkIcon },
    { to: '/admin/modules', label: 'Módulos', icon: PackageIcon },
    { to: '/admin/invites', label: 'Convites', icon: MailIcon },
    { to: '/admin/queue', label: 'Fila', icon: PlayIcon },
  ] as const

  return (
    <div className="flex h-full flex-col gap-2 bg-neutral-900 p-4 md:w-1/4">
      <For each={links}>
        {(link, i) => (
          <Link
            key={i}
            className="flex items-center gap-2 rounded-lg p-3 [&.active]:bg-neutral-800"
            to={link.to}
          >
            {link.icon && <link.icon className="h-5 w-5" />}
            <span className="hidden md:inline">{link.label}</span>
          </Link>
        )}
      </For>
    </div>
  )
}
