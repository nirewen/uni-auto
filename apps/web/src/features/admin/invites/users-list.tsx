import { useState } from 'react'

import { For } from '@/components/flow/for'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { UserCardTrigger } from '@/features/users/components/user-card'
import { User } from '@/features/users/types'

import { getGhostUser, nameToInitials } from '@/lib/utils'

type UserListProps = {
  value?: string
  users: User[]
  onSelect: (user: User) => void
}

export function UsersList({ value, users, onSelect }: UserListProps) {
  const [open, setOpen] = useState(false)
  const selectedUser = users.find((u) => u.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <UserCardTrigger user={selectedUser ?? getGhostUser()} mini />
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <For each={users}>
              {(user) => (
                <CommandItem
                  className="flex items-center gap-2"
                  onSelect={() => {
                    setOpen(false)
                    onSelect(user)
                  }}
                >
                  <Avatar className="h-5 w-5">
                    <AvatarImage
                      className="object-cover"
                      src={user.avatarUrl}
                    />
                    <AvatarFallback>
                      {nameToInitials(user.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate text-sm">{user.displayName}</span>
                </CommandItem>
              )}
            </For>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
