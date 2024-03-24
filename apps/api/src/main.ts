import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'

import { AppModule } from './app.module'
import { JwtAuthGuard } from './auth/guards'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV !== 'production' ||
      process.env.STRUCTURED_LOGGING === 'false'
        ? ['log', 'error', 'warn', 'debug', 'verbose']
        : WinstonModule.createLogger({
            transports: [
              new winston.transports.Console({
                format: winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.ms(),
                  winston.format.json(),
                ),
              }),
            ],
          }),
  })

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))
  const port = process.env.PORT || 3000
  await app.listen(port)

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}

bootstrap()
