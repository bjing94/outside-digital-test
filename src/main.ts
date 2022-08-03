import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['POST', 'GET', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD', 'PUT'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
