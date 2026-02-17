import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('AI Office Bot API')
    .setDescription('Backend API for AI Office Bot — control your office electronics with voice commands.')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app);
  await app.init(); // Only used in serverless — listen() will call this internally in local dev
  return app;
}

// Local development only
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    setupSwagger(app);
    await app.listen(process.env.PORT || 3000); // listen() handles init() internally
    console.log(`Application is running on: ${await app.getUrl()}`);
  })();
}