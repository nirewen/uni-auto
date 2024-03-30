import { ColumnDef } from '@tanstack/react-table'
import { ArrowRightIcon, InfinityIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { InviteCode } from '@/lib/api'

import { ActiveStatus } from '@/components/active-status'
import { Copy } from '@/components/copy'
import { DateSpan } from '@/components/table/date-span'
import { SortingHeader } from '@/components/table/sorting-header'
import { For } from '@/components/util/for'
import { Show } from '@/components/util/show'
import { UserCard } from '@/features/connections/user/user-card'
import { InviteRole } from '@/features/invites/invite-role'
import { InviteUseCard } from '@/features/invites/invite-use'

export const columns: ColumnDef<InviteCode>[] = [
  {
    accessorKey: 'enabled',
    header: '',
    size: -1,
    cell: ({ row }) => <ActiveStatus active={row.original.active} />,
  },
  {
    accessorKey: 'role',
    size: 70,
    header: 'Função',
    cell: ({ row }) => (
      <div className="flex justify-end">
        <InviteRole role={row.original.role} />
      </div>
    ),
  },
  {
    accessorKey: 'code',
    header: 'Código',
    size: 320,
    cell: ({ row }) => {
      return (
        <Copy
          className="w-auto min-w-5"
          spanClassName="truncate"
          content={row.original.code}
        />
      )
    },
  },
  {
    accessorKey: 'uses',
    size: 130,
    header: 'Usos/Max',
    cell: ({ row }) => {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 text-nowrap">
              <span>{row.original.uses.length} de</span>
              <span>
                {row.original.maxUses > 0 ? (
                  row.original.maxUses
                ) : (
                  <InfinityIcon className="h-4 w-4" />
                )}
              </span>
              <span>usos</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="flex flex-col gap-2">
              <span className="text-sm">
                Usuários que utilizaram esse código
              </span>
              <div className="flex -space-x-3">
                <For
                  each={row.original.uses}
                  fallback={
                    <span className="text-sm text-muted-foreground">
                      Nenhum uso
                    </span>
                  }
                >
                  {(use) => {
                    return <InviteUseCard key={use.id} use={use} />
                  }}
                </For>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )
    },
  },
  {
    accessorKey: 'createdBy',
    size: 130,
    header: () => <span className="text-nowrap">Criado por</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <UserCard mini user={row.original.createdBy} />
        <Show
          when={
            row.original.assignedTo &&
            row.original.assignedTo.id !== row.original.createdBy.id
          }
        >
          <ArrowRightIcon className="h-4 w-4 text-neutral-500" />
          <UserCard mini user={row.original.assignedTo} />
        </Show>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => (
      <SortingHeader column={column}>Criado em</SortingHeader>
    ),
    cell: ({ row }) => <DateSpan date={row.original.createdAt} />,
    sortingFn: 'datetime',
  },
]
