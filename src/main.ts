import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const configService = app.get(ConfigService);

  const port = Number(configService.get('PORT'));
  const frontendUrl = configService.get('FRONTEND_URL');
  if (!frontendUrl) throw new Error('FRONTEND_URL not set');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Document')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: [frontendUrl], credentials: true });

  await app.listen(port);
  console.log(`################## start app with port ${port}`);
}
bootstrap();
