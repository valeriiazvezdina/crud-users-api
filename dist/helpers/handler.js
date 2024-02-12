"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const users_controller_1 = require("../controllers/users.controller");
const statusCodes_1 = require("../enums/statusCodes");
const uuid_1 = require("uuid");
const notValidInputError_1 = require("../errors/notValidInputError");
const notFoundError_1 = require("../errors/notFoundError");
const usersController = new users_controller_1.UsersController();
class RequestHandler {
    handleGetRequest(req, res, parsedUrl) {
        if (parsedUrl.path === '/api/users') {
            const data = usersController.getAllUsers();
            const status = statusCodes_1.StatusCodes.OK;
            this.sendResponse(res, status, data);
        }
        else {
            const userId = this.getUserIdParam(parsedUrl.path);
            if (!(0, uuid_1.validate)(userId)) {
                throw new notValidInputError_1.NotValidInputError();
            }
            const user = usersController.getUserById(userId);
            if (!user) {
                throw new notFoundError_1.NotFoundError();
            }
            const status = statusCodes_1.StatusCodes.OK;
            this.sendResponse(res, status, user);
        }
    }
    handlePostRequest(req, res) {
        let requestBody = '';
        req.on('data', (chunk) => {
            requestBody += chunk;
        });
        if (!requestBody) {
            throw new notValidInputError_1.NotValidInputError();
        }
        req.on('end', () => {
            const data = JSON.parse(requestBody);
            data.id = data.length + 1;
            data.push(data);
            this.sendResponse(res, 201, data);
        });
    }
    handlePutRequest(req, res, parsedUrl) {
        let requestBody = '';
        req.on('data', (chunk) => {
            requestBody += chunk;
        });
        req.on('end', () => {
            const updatedUser = JSON.parse(requestBody);
            const userId = this.getUserIdParam(parsedUrl.path);
            if (!(0, uuid_1.validate)(userId)) {
                throw new notValidInputError_1.NotValidInputError();
            }
            usersController.updateUser(userId, updatedUser);
            const status = statusCodes_1.StatusCodes.OK;
            this.sendResponse(res, status);
        });
    }
    handleDeleteRequest(req, res, parsedUrl) {
        const userId = this.getUserIdParam(parsedUrl.path);
        if (!(0, uuid_1.validate)(userId)) {
            throw new notValidInputError_1.NotValidInputError();
        }
        usersController.deleteUser(userId);
        const status = statusCodes_1.StatusCodes.OK;
        this.sendResponse(res, status);
    }
    sendResponse(res, statusCode, data) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = statusCode;
        data ? res.write(JSON.stringify(data)) : null;
        res.end();
    }
    ;
    getUserIdParam(path) {
        const pathParts = path.split('/');
        if (pathParts.length === 4 && pathParts[1] === 'api' && pathParts[2] === 'users') {
            return pathParts[3];
        }
    }
}
exports.RequestHandler = RequestHandler;
