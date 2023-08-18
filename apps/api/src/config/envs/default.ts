export const config = {
  db: {
    entities: [`${__dirname}/../../entities/**/*.entity.{js,ts}`],
    subscribers: [`${__dirname}/../../subscribers/**/*.{js,ts}`],
    migrations: [`${__dirname}/../../migrations/**/*.{js,ts}`],
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  UFSM_API_URL: process.env.UFSM_API_URL,
}
