import { Connections } from './components/connections'
import { UniAutoLogo } from './components/logo'
import { Modules } from './components/modules'
import { LoggedInUser } from './components/user'

export function Navbar() {
  return (
    <div className="flex w-full items-center gap-2">
      <UniAutoLogo />
      <Connections />
      <Modules />
      <LoggedInUser className="ml-auto" />
    </div>
  )
}
