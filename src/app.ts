import { Server, createServer, IncomingMessage, ServerResponse } from 'node:http';
import { RequestHandler } from './helpers/handler';
import { HttpResponse } from './interfaces/interfaces';
import url from 'node:url';
import { NotExistingEndpoint } from './errors/notExistingEndpoint';

export const app = (): Server => {
    const server: Server = createServer(async (req: IncomingMessage, res: ServerResponse): Promise<HttpResponse> => {

        const parsedUrl = url.parse(req.url as string, true);

        const requestHandler = new RequestHandler();

        res.writeHead(200, { 'Content-Type': 'application/json' });

        try {

            if (req.method === 'GET' && parsedUrl.path?.startsWith('/api/users')) {
                await requestHandler.handleGetRequest(req, res, parsedUrl);
            } 
            else if (req.method === 'POST' && parsedUrl.path === '/api/users') {
                await requestHandler.handlePostRequest(req, res);
            }
            else if (req.method === 'PUT' && parsedUrl.path?.startsWith('/api/users')) {
                await requestHandler.handlePutRequest(req, res, parsedUrl);
            }
            else if (req.method === 'DELETE' && parsedUrl.path?.startsWith('/api/users')) {
                await requestHandler.handleDeleteRequest(req, res, parsedUrl);
            }
            else {
                throw new NotExistingEndpoint();
            }

            // const response = handler(req, res, parsedUrl);

            // res.statusCode = response.statusCode;

            // res.write(JSON.stringify(response));
        } catch(err: any) {
            if (err instanceof NotExistingEndpoint) {
                res.statusCode = 400;
                res.end({
                    error: err.message
                });
            } else {
                res.statusCode = 500;
                res.end(`Server side error: ${err.message}`);
            }
        }
    });

    return server;
}