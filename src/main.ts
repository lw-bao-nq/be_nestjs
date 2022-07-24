import { NestFactory } from '@nestjs/core';
import { Request, Response, NextFunction } from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4100, () =>
    logger.log(`Application listening on port 4100`),
  );
}
bootstrap();
