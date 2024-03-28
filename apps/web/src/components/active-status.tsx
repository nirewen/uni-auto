type ActiveStatusProps = {
  active: boolean
}

export function ActiveStatus({ active }: ActiveStatusProps) {
  if (!!active) {
    return <span className="h-3 w-3 rounded-full bg-green-500"></span>
  }
  return <span className="h-3 w-3 rounded-full bg-red-500"></span>
}
