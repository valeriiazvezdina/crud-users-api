import { IncomingMessage, ServerResponse } from 'http';
import { UsersController } from '../controllers/users.controller';
import { User, HttpResponse } from '../interfaces/interfaces';
import { NotExistingEndpoint } from '../errors/notExistingEndpoint';
import url from 'node:url';

const usersController = new UsersController();
 
export class RequestHandler {
    handleGetRequest(req: IncomingMessage, res: ServerResponse, parsedUrl: url.UrlWithParsedQuery) {
        return new Promise<void>((resolve, reject) => {
            if ()
        })
    }

    handlePostRequest(req: IncomingMessage, res: ServerResponse) {
        return new Promise<void>((resolve, reject) => {
            
        })
    }

    handlePutRequest(req: IncomingMessage, res: ServerResponse, parsedUrl: url.UrlWithParsedQuery) {
        return new Promise<void>((resolve, reject) => {
            
        })
    }

    handleDeleteRequest(req: IncomingMessage, res: ServerResponse, parsedUrl: url.UrlWithParsedQuery) {
        return new Promise<void>((resolve, reject) => {
            
        })
    }

    sendResponse(res: ServerResponse, statusCode: number, data: string) {
        res.statusCode = statusCode;
        res.end(JSON.stringify(data));
      };
}