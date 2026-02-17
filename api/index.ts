import serverlessExpress from '@codegenie/serverless-express';
import { createApp } from '../main';

let cachedServer: any;

export default async function handler(req: any, res: any) {
    if (!cachedServer) {
        const app = await createApp();
        await app.init();
        const expressApp = app.getHttpAdapter().getInstance();
        cachedServer = serverlessExpress({ app: expressApp });
    }
    return cachedServer(req, res);
}
