import { LoggedInUser } from './user'

import logo from '@/assets/Logo.svg'
import { Link } from '@tanstack/react-router'
import { Connections } from './components/connections'
import { Modules } from './components/modules'

export function Navbar() {
  return (
    <div className="flex w-full items-center gap-2 p-1">
      <Link to="/">
        <div className="flex select-none items-center gap-2 p-1">
          <img className="h-8 w-8 min-w-8" src={logo} alt="Logo" />
          <span className="hidden font-logo font-semibold md:inline">
            uni-auto
          </span>
        </div>
      </Link>
      <span className="h-6 w-0.5 bg-neutral-900"></span>
      <Connections />
      <Modules />
      <LoggedInUser className="ml-auto" />
    </div>
  )
}
