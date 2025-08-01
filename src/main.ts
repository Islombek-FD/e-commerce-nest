import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as process from 'process';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { GlobalHttpExceptionFilter } from '@/common/exceptions/http-exception.filter';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => {
    logger.log(`Server is running on port: [${process.env.PORT}]`);
  })
  .catch((err) => {
    logger.log(`Error is occurred during initialization the server: [${err}]`);
  });
