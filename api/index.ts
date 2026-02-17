import 'reflect-metadata';
import serverlessExpress from '@codegenie/serverless-express';
import { createApp } from '../main';

let cachedServer: any;

export default async function handler(req: any, res: any) {
    console.log('[Serverless] Handler called');
    try {
        console.log('[Serverless] Checking environment variables...');
        if (!process.env.MONGODB_URI) {
            console.error('[Serverless] ERROR: MONGODB_URI is missing!');
        } else {
            console.log('[Serverless] MONGODB_URI is set');
        }

        if (!cachedServer) {
            console.log('[Serverless] Initializing new app instance...');
            const app = await createApp();
            console.log('[Serverless] NestJS app created');
            await app.init();
            console.log('[Serverless] NestJS app initialized');
            const expressApp = app.getHttpAdapter().getInstance();
            cachedServer = serverlessExpress({ app: expressApp });
            console.log('[Serverless] Serverless adapter ready');
        } else {
            console.log('[Serverless] Using cached server');
        }
        return cachedServer(req, res);
    } catch (error) {
        console.error('SERVERLESS HANDLER ERROR:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
