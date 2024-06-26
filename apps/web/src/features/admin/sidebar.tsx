import { For } from '@/components/flow/for'
import { ScrollArea } from '@/components/ui/scroll-area'
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
    <div className="flex flex-col rounded-full border border-neutral-800 bg-neutral-900 p-2 sm:w-min md:w-1/4 md:rounded-3xl">
      <ScrollArea>
        <div className="flex flex-row justify-between gap-1 sm:flex-col sm:justify-normal">
          <For each={links}>
            {(link, i) => (
              <Link
                key={i}
                className="flex items-center gap-3 rounded-full p-3 transition-colors hover:bg-neutral-800 sm:flex-grow-0 md:rounded-2xl [&.active]:bg-neutral-800"
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
