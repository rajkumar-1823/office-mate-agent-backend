import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let server: any;

export async function createServer() {
  if (server) return server;

  const expressApp = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    { bufferLogs: true }
  );

  app.enableCors();

  await app.init();

  server = expressApp;
  return server;
}
