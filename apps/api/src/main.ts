import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'

import { AppModule } from './app.module'
import { JwtAuthGuard } from './auth/guards'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))

  await app.listen(3001)
}
bootstrap()
