import { Server, createServer } from 'node:http';
import { handler } from './helpers/handler';

export const app = (): Server => {
    const server: Server = createServer(async (req, res) => {

        try {
            const response = await handler(req, res);
            // res.statusCode = response.status;
            res.end(response);
        } catch(err: any) {
            res.statusCode = 500;
            res.end(`Server side error: ${err.message}`);
        }
    });

    return server;
}