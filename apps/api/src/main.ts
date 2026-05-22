import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env['WEB_BASE_URL'] ?? 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env['PORT'] ?? 4000;
  await app.listen(port);
  console.warn(`API running on http://localhost:${port}`);
}

void bootstrap();
