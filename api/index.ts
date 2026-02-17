import { createServer } from '../main';

let cachedServer: any;

export default async function handler(req: any, res: any) {
    try {
        if (!cachedServer) {
            cachedServer = await createServer();
        }

        return cachedServer(req, res);
    } catch (err: any) {
        console.error('LAMBDA CRASH:', err);
        res.status(500).json({
            message: 'Server crashed',
            error: err?.message,
        });
    }
}
