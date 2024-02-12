"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotValidInputError = void 0;
class NotValidInputError extends Error {
    constructor() {
        super();
        this.message = 'Invalid input';
    }
}
exports.NotValidInputError = NotValidInputError;
