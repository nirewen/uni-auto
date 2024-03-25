import { SetMetadata } from '@nestjs/common'

export const IS_LOGGED_IN = 'isLoggedIn'
export const LoggedIn = () => SetMetadata(IS_LOGGED_IN, true)
