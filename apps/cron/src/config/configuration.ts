import type { Config, Objectype } from './config.interface'

import { config as DefaultConfig } from './envs/default'
import { config as DevelopmentConfig } from './envs/development'
import { config as ProductionConfig } from './envs/production'

const util = {
  isObject<T>(value: T): value is T & Objectype {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
  },
  merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key]
      const sourceValue = source[key]
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue))
      }
    }

    return { ...target, ...source }
  },
}

export const configuration = async (): Promise<Config> => {
  const config = DefaultConfig
  const environment =
    process.env.NODE_ENV === 'production' ? ProductionConfig : DevelopmentConfig

  // object deep merge
  return util.merge(config, environment)
}
