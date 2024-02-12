"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotExistingEndpointError = void 0;
class NotExistingEndpointError extends Error {
    constructor() {
        super();
        this.message = "Such endpoint doesn't exist";
    }
}
exports.NotExistingEndpointError = NotExistingEndpointError;
