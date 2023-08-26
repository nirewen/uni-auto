import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const config = {
  db: {
    type: 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'ufsm-ru',
    schema: process.env.DB_SCHEMA || 'public',

    synchronize: false,
    logging: false,
    autoLoadEntities: true,
  } satisfies TypeOrmModuleOptions,
}
