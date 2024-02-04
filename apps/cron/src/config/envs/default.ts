import * as entities from '@uni-auto/shared/entities'

export const config = {
  db: {
    entities: Object.values(entities),
    subscribers: [`${__dirname}/../../subscribers/**/*.{js,ts}`],
    migrations: [`${__dirname}/../../migrations/**/*.{js,ts}`],
  },
  api: {
    baseUrl: process.env.API_BASE_URL,
    accessToken: process.env.API_ACCESS_TOKEN,
  },
}
