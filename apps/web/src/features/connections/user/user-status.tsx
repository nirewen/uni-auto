type UserStatusProps = {
  active: boolean
}

export function UserStatus({ active }: UserStatusProps) {
  if (!!active) {
    return <span className="h-3 w-3 rounded-full bg-green-500"></span>
  }
  return <span className="h-3 w-3 rounded-full bg-red-500"></span>
}
