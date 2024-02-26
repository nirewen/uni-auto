import { ConnectionType } from '@uni-auto/shared/entities/connection.entity'

export interface Credentials {
  user: {
    id: string
  }
  identifier: string
  token: string
  type: ConnectionType
}
