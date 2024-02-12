"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor() {
        super();
        this.message = 'Not found';
    }
}
exports.NotFoundError = NotFoundError;
