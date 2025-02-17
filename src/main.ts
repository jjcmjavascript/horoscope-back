import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from '@config/config';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent'],
    origin: config.cors.origins,
    credentials: config.cors.credentials,
  });

  await app.listen(config.app.port);
}

bootstrap();
