export const config = {
  db: {
    entities: [`${__dirname}/../../entities/**/*.entity.{js,ts}`],
    subscribers: [`${__dirname}/../../subscribers/**/*.{js,ts}`],
    migrations: [`${__dirname}/../../migrations/**/*.{js,ts}`],
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  NTFY_INSTANCE_URL: process.env.NTFY_INSTANCE_URL,
  NTFY_ACCESS_TOKEN: process.env.NTFY_ACCESS_TOKEN,

  UFSM_API_URL: process.env.UFSM_API_URL,
  UFSM_DEVICE_ID_PREFIX: process.env.UFSM_DEVICE_ID_PREFIX,
}
