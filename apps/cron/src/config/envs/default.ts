export const config = {
  db: {
    entities: [`${__dirname}/../../entities/**/*.entity.{js,ts}`],
    subscribers: [`${__dirname}/../../subscribers/**/*.{js,ts}`],
    migrations: [`${__dirname}/../../migrations/**/*.{js,ts}`],
  },
  api: {
    baseUrl: process.env.API_BASE_URL,
    accessToken: process.env.API_ACCESS_TOKEN,
  }
}
