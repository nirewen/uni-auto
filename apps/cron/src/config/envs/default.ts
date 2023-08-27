export const config = {
  db: {
    entities: [`${__dirname}/../../entities/**/*.entity.{js,ts}`],
    subscribers: [`${__dirname}/../../subscribers/**/*.{js,ts}`],
    migrations: [`${__dirname}/../../migrations/**/*.{js,ts}`],
  },

  API_JWT_TOKEN: process.env.API_JWT_TOKEN,
  API_BASE_URL: process.env.API_BASE_URL,
}
