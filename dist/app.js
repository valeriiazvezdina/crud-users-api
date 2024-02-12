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
const node_http_1 = __importDefault(require("node:http"));
const handler_1 = require("./helpers/handler");
const app = () => {
    const server = node_http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, handler_1.handler)(req, res);
            // res.statusCode = response.status;
            res.end(response);
        }
        catch (err) {
            res.statusCode = 500;
            res.end(`Server side error: ${err.message}`);
        }
    }));
    return server;
};
exports.app = app;
