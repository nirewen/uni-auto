import { Connection } from '../connections/types'

export type Queue = {
  id: string
  status: string
  data: Record<string, any>
  endpoint: string
  connection: Connection
  createdAt: string
  updatedAt: string
}
