
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allow frontend to connect
  return app;
}

async function bootstrap() {
  const app = await createApp();
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Only run the server directly when not in serverless mode
if (require.main === module) {
  bootstrap();
}
