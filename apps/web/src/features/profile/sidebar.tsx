import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { For } from '@/components/util/for'
import { Link } from '@tanstack/react-router'
import { MailIcon, User2Icon } from 'lucide-react'

export function Sidebar() {
  const links = [
    { to: '/profile/', label: 'Conta', icon: User2Icon },
    { to: '/profile/invites', label: 'Convites', icon: MailIcon },
  ] as const

  return (
    <div className="flex flex-col rounded-full border border-neutral-800 bg-neutral-900 p-2 sm:w-min md:w-1/4 md:rounded-3xl">
      <ScrollArea>
        <div className="flex flex-row gap-1 sm:flex-col sm:justify-normal">
          <For each={links}>
            {(link, i) => (
              <Link
                key={i}
                className="flex flex-1 items-center gap-3 rounded-full p-3 transition-colors hover:bg-neutral-800 sm:flex-grow-0 md:rounded-2xl [&.active]:bg-neutral-800"
                to={link.to}
              >
                {link.icon && <link.icon className="h-5 w-5" />}
                <span className="inline sm:hidden md:inline">{link.label}</span>
              </Link>
            )}
          </For>
        </div>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
