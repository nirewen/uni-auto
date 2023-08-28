export const config = {
  db: {
    entities: [`${__dirname}/../../entities/**/*.entity.{js,ts}`],
    subscribers: [`${__dirname}/../../subscribers/**/*.{js,ts}`],
    migrations: [`${__dirname}/../../migrations/**/*.{js,ts}`],
  },

  NTFY_INSTANCE_URL: process.env.NTFY_INSTANCE_URL,
  NTFY_ACCESS_TOKEN: process.env.NTFY_ACCESS_TOKEN,

  API_ACCESS_TOKEN: process.env.API_ACCESS_TOKEN,
  API_BASE_URL: process.env.API_BASE_URL,
}
