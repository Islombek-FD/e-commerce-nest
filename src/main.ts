import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  app.setGlobalPrefix('api')
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('E-Commerce API documents')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => {
    logger.log(`Server is running on port: [${process.env.PORT}]`);
  })
  .catch((err) => {
    logger.log(`Error is occurred during initialization the server: [${err}]`);
  });
