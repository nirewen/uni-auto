import { Provider } from '@nestjs/common'

export const PROVIDER = Symbol('PROVIDER')

export interface ProviderInterface {
  slug: string
  name: string
}

export const ProviderService = {
  provide: PROVIDER,
  useValue: {
    slug: 'ufsm',
    name: 'UFSM',
  } as ProviderInterface,
} satisfies Provider
