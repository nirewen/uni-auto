import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'

import { AppModule } from './app.module'
import { JwtAuthGuard } from './auth/guards'

const LokiTransport = require('winston-loki')

async function bootstrap() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.printf(
          ({ level, message }) => `${level}: ${message}`
        ),
      }),
      new LokiTransport({
        host: 'http://loki-loki-1:3100',
        json: true,
        labels: {
          job: 'uni-auto-api',
        },
        format: winston.format.printf(
          ({ level, message }) => `${level}: ${message}`
        ),
        batching: false,
        replaceTimestamp: true,
      }),
    ],
  })

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  })

  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))

  await app.listen(3001)
}
bootstrap()
