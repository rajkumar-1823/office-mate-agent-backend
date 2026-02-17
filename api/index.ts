import 'reflect-metadata';
import { createApp } from '../main';

// Cache the NestJS app instance for warm starts
let app: any;

export default async function handler(req: any, res: any) {
    // console.log('[Serverless] Handler called'); // Uncomment for debugging
    try {
        if (!app) {
            // console.log('[Serverless] Initializing new app instance...'); // Uncomment for debugging

            // Basic sanity check for critical env var
            if (!process.env.MONGODB_URI) {
                console.error('[Serverless] CRITICAL ERROR: MONGODB_URI is missing!');
            }

            const nestApp = await createApp();
            await nestApp.init();

            // Get the underlying Express instance
            app = nestApp.getHttpAdapter().getInstance();
            // console.log('[Serverless] NestJS app initialized'); // Uncomment for debugging
        }

        // Forward the request directly to Express
        return app(req, res);
    } catch (error: any) {
        console.error('SERVERLESS HANDLER ERROR:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        });
    }
}
