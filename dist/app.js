"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const node_http_1 = require("node:http");
const handler_1 = require("./helpers/handler");
const node_url_1 = __importDefault(require("node:url"));
const notExistingEndpointError_1 = require("./errors/notExistingEndpointError");
const notValidInputError_1 = require("./errors/notValidInputError");
const notFoundError_1 = require("./errors/notFoundError");
const statusCodes_1 = require("./enums/statusCodes");
const app = () => {
    const server = (0, node_http_1.createServer)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const parsedUrl = node_url_1.default.parse(req.url, true);
        const requestHandler = new handler_1.RequestHandler();
        try {
            if (req.method === 'GET' && ((_a = parsedUrl.path) === null || _a === void 0 ? void 0 : _a.startsWith('/api/users'))) {
                requestHandler.handleGetRequest(req, res, parsedUrl);
            }
            else if (req.method === 'POST' && parsedUrl.path === '/api/users') {
                requestHandler.handlePostRequest(req, res);
            }
            else if (req.method === 'PUT' && ((_b = parsedUrl.path) === null || _b === void 0 ? void 0 : _b.startsWith('/api/users'))) {
                requestHandler.handlePutRequest(req, res, parsedUrl);
            }
            else if (req.method === 'DELETE' && ((_c = parsedUrl.path) === null || _c === void 0 ? void 0 : _c.startsWith('/api/users'))) {
                requestHandler.handleDeleteRequest(req, res, parsedUrl);
            }
            else {
                throw new notExistingEndpointError_1.NotExistingEndpointError();
            }
        }
        catch (err) {
            if (err instanceof notExistingEndpointError_1.NotExistingEndpointError || err instanceof notValidInputError_1.NotValidInputError) {
                res.statusCode = statusCodes_1.StatusCodes.BAD_REQUEST;
                res.write(JSON.stringify({
                    error: err.message
                }));
                res.end();
            }
            else if (err instanceof notFoundError_1.NotFoundError) {
                res.statusCode = statusCodes_1.StatusCodes.NOT_FOUND;
                res.write(JSON.stringify({
                    error: err.message
                }));
                res.end();
            }
            else {
                res.statusCode = statusCodes_1.StatusCodes.SERVER_SIDE_ERROR;
                res.end(`Server side error: ${err.message}`);
            }
        }
    }));
    return server;
};
exports.app = app;
