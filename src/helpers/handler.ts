import { IncomingMessage, ServerResponse } from 'http';
import { UsersController } from '../controllers/users.controller';
import { User, HttpResponse } from '../interfaces/interfaces';
import url from 'node:url';
import { StatusCodes } from '../enums/statusCodes';
import { validate } from 'uuid';
import { NotValidInputError } from '../errors/notValidInputError';
import { NotFoundError } from '../errors/notFoundError';

const usersController = new UsersController();
 
export class RequestHandler {
    handleGetRequest(req: IncomingMessage, res: ServerResponse, parsedUrl: url.UrlWithParsedQuery) {
        if (parsedUrl.path === '/api/users') {
            const data = usersController.getAllUsers();

            const status = StatusCodes.OK;
            this.sendResponse(res, status, data);
        } else {
            // const userId = req.params

            if (!validate(userId)) {
                throw new NotValidInputError();
            }

            const user = usersController.getUserById(userId);

            if (!user) {
                throw new NotFoundError();
            }

            const status = StatusCodes.OK;
            this.sendResponse(res, status, user);
        }
    }

    handlePostRequest(req: IncomingMessage, res: ServerResponse) {
        let requestBody = '';

        req.on('data', (chunk) => {
          requestBody += chunk;
        });

        if (!requestBody) {
            throw new NotValidInputError();
        }
      
        req.on('end', () => {
          const data = JSON.parse(requestBody);

          data.id = data.length + 1;

          data.push(data);
      
          this.sendResponse(res, 201, data);
        });
    }

    handlePutRequest(req: IncomingMessage, res: ServerResponse, parsedUrl: url.UrlWithParsedQuery) {
            
    }

    handleDeleteRequest(req: IncomingMessage, res: ServerResponse, parsedUrl: url.UrlWithParsedQuery) {
            
    }

    sendResponse(res: ServerResponse, statusCode: number, data: User | Array<User>) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = statusCode;
        res.write(JSON.stringify(data));
        res.end();
      };
}