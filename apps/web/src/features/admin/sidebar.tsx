import { ScrollArea } from '@/components/ui/scroll-area'
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
    <div className="flex w-min flex-col bg-neutral-900 p-2 md:w-1/4">
      <ScrollArea>
        <div className="flex flex-col gap-1">
          <For each={links}>
            {(link, i) => (
              <Link
                key={i}
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-neutral-800 [&.active]:bg-neutral-800"
                to={link.to}
              >
                {link.icon && <link.icon className="h-5 w-5" />}
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            )}
          </For>
        </div>
      </ScrollArea>
    </div>
  )
}
