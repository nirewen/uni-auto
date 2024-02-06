import * as entities from '../../entities'

export const config = {
  db: {
    entities: Object.values(entities),
    subscribers: [`${__dirname}/../../subscribers/**/*.{js,ts}`],
    migrations: [`${__dirname}/../../migrations/**/*.{js,ts}`],
  },
  jwt: {
    secret: process.env['JWT_SECRET'],
    refreshSecret: process.env['JWT_REFRESH_SECRET'],
  },
  ntfy: {
    instanceUrl: process.env['NTFY_INSTANCE_URL'],
    accessToken: process.env['NTFY_ACCESS_TOKEN'],
  },
  ufsm: {
    apiUrl: process.env['UFSM_API_URL'],
    deviceIdPrefix: process.env['UFSM_DEVICE_ID_PREFIX'],
  },
  api: {
    baseUrl: process.env['API_BASE_URL'],
    accessToken: process.env['API_ACCESS_TOKEN'],
  },
  auth: {
    google: {
      clientId: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      redirectUrl: process.env['GOOGLE_REDIRECT_URL'],
    },
  },
}
