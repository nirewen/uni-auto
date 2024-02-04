import { SetMetadata } from '@nestjs/common'
import { UserRole } from '@uni-auto/shared/entities/user.entity'

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)
