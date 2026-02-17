import { createApp } from '../main';

let expressApp: any;
let initPromise: Promise<any> | null = null;

export default async function handler(req: any, res: any) {
    try {
        if (!expressApp) {
            if (!initPromise) {
                if (!process.env.MONGODB_URI) {
                    throw new Error('[Serverless] MONGODB_URI environment variable is not set');
                }

                initPromise = createApp()
                    .then(nestApp => {
                        expressApp = nestApp.getHttpAdapter().getInstance();
                        console.log('[Serverless] NestJS app initialized successfully');
                        return expressApp;
                    })
                    .catch(err => {
                        // Reset so next request retries initialization
                        initPromise = null;
                        throw err;
                    });
            }

            await initPromise;
        }

        return expressApp(req, res);
    } catch (error: any) {
        console.error('[Serverless] HANDLER ERROR:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error),
        });
    }
}