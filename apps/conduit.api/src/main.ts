import {
  INestApplication,
  Logger,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

if (process.env.NODE_ENV !== 'production') {
  // TODO:
}

export async function createApp(options?: NestApplicationOptions) {
  const app = await NestFactory.create(AppModule, options);
  await configureApp(app);
  return app;
}

export async function configureApp(app: INestApplication) {
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );
  app.enableShutdownHooks();
}

async function main() {
  const app = await createApp();
  // const appEnvironment = app.get(AppEnvironment);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`Conduit.api is running on: ${await app.getUrl()}`, 'main');
}

if (process.env.NODE_ENV !== 'test') {
  void main();
}
