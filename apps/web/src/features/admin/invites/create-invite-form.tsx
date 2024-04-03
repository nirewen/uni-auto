import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { For } from '@/components/flow/for'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useAllUsers } from '@/features/users/hooks'

import { useCreateInvite } from '@/features/invites/hooks'
import { useAuth } from '@/hooks/useAuth'
import { UsersList } from './users-list'

const inviteRoles = ['ACCOUNT_ACTIVATION'] as const

const schema = z.object({
  code: z.string().optional(),
  role: z.enum(inviteRoles).optional(),
  maxUses: z.coerce.number().gt(-2).optional(),
  active: z.boolean().optional(),
  assignedTo: z.string().uuid().optional(),
  usableBy: z.string().uuid().optional(),
  createdBy: z.string().uuid().optional(),
})

type FormValues = z.infer<typeof schema>

export function CreateInviteForm() {
  const { user } = useAuth()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: crypto.randomUUID(),
      role: `${inviteRoles[0]}`,
      maxUses: 1,
      active: true,
      createdBy: user?.id,
    },
  })
  const users = useAllUsers()
  const createInvite = useCreateInvite()

  function onSubmit(data: FormValues) {
    let o = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != null),
    )

    createInvite.mutate(o)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Novo convite</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Código
                    <FormField
                      control={form.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="ml-auto flex items-center gap-2">
                          <FormLabel>Ativo</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="font-mono"
                      placeholder="AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Função</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <For each={inviteRoles}>
                          {(role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          )}
                        </For>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxUses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Máx usos</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex [&>*]:flex-1 gap-8">
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Atribuído a</FormLabel>
                    <FormControl>
                      <UsersList
                        value={field.value}
                        users={users.data!.items}
                        onSelect={(u) => field.onChange(u.id)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="usableBy"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Usável por</FormLabel>
                    <FormControl>
                      <UsersList
                        value={field.value}
                        users={users.data!.items}
                        onSelect={(u) => field.onChange(u.id)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="createdBy"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Criado por</FormLabel>
                    <FormControl>
                      <UsersList
                        value={field.value}
                        users={users.data!.items}
                        onSelect={(u) => field.onChange(u.id)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Criar</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
