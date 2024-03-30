import { Module } from '@/lib/services/module.service'
import { User } from '@/lib/services/user.service'
import { Provider } from '../provider/types'

export interface Connection {
  id: string
  identifier: string
  provider: Provider
  profile?: ConnectionProfile
  modules?: ModuleSettings[]
  type: string
  user?: User
  createdAt: string
  updatedAt: string
}

export interface ConnectionProfile {
  displayName: string
  avatarUrl: string
  connection: Connection
  updatedAt: string
}

export type ConnectionModule<Settings = Record<string, any>> = {
  id: string
  settings: Settings
  enabled: boolean
  updatedAt: string
  createdAt: string
  connection: Connection
}

export type ConnectionProfileHealth = {
  status: 'OK' | 'ERROR'
}

export interface ModuleSettings {
  id: string
  module: Module
  settings: Record<string, unknown>
  updatedAt: string
  createdAt: string
}
