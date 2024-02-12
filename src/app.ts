import { Server, createServer, IncomingMessage, ServerResponse } from 'node:http';
import { RequestHandler } from './helpers/handler';
import { HttpResponse } from './interfaces/interfaces';
import url from 'node:url';
import { NotExistingEndpointError } from './errors/notExistingEndpointError';
import { NotValidInputError } from './errors/notValidInputError';
import { NotFoundError } from './errors/notFoundError';
import { StatusCodes } from './enums/statusCodes';

export const app = (): Server => {
    const server: Server = createServer(async (req: IncomingMessage, res: ServerResponse) => {

        const parsedUrl = url.parse(req.url as string, true);

        const requestHandler = new RequestHandler();

        try {
            if (req.method === 'GET' && parsedUrl.path?.startsWith('/api/users')) {
                requestHandler.handleGetRequest(req, res, parsedUrl);
            } 
            else if (req.method === 'POST' && parsedUrl.path === '/api/users') {
                requestHandler.handlePostRequest(req, res);
            }
            else if (req.method === 'PUT' && parsedUrl.path?.startsWith('/api/users')) {
                requestHandler.handlePutRequest(req, res, parsedUrl);
            }
            else if (req.method === 'DELETE' && parsedUrl.path?.startsWith('/api/users')) {
                requestHandler.handleDeleteRequest(req, res, parsedUrl);
            }
            else {
                throw new NotExistingEndpointError();
            }
        } catch(err: any) {
            if (err instanceof NotExistingEndpointError || err instanceof NotValidInputError) {
                res.statusCode = StatusCodes.BAD_REQUEST;
                res.write(JSON.stringify({
                    error: err.message
                }));
                res.end();
            } else if (err instanceof NotFoundError) {
                res.statusCode = StatusCodes.NOT_FOUND;
                res.write(JSON.stringify({
                    error: err.message
                }));
                res.end();
            } else {
                res.statusCode = StatusCodes.SERVER_SIDE_ERROR;
                res.end(`Server side error: ${err.message}`);
            }
        }
    });

    return server;
}