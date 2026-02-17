import 'reflect-metadata';
import { createApp } from '../main';

// Cache the Express instance across warm serverless invocations
let expressApp: any;

export default async function handler(req: any, res: any) {
    try {
        if (!expressApp) {
            if (!process.env.MONGODB_URI) {
                console.error('[Serverless] CRITICAL ERROR: MONGODB_URI is missing!');
            }

            // createApp() handles NestFactory.create + enableCors + swagger + init
            const nestApp = await createApp();
            expressApp = nestApp.getHttpAdapter().getInstance();
        }

        return expressApp(req, res);
    } catch (error: any) {
        console.error('SERVERLESS HANDLER ERROR:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error),
        });
    }
}