export class NotFoundError extends Error {
    constructor() {
        super();
        this.message = 'Not found';
    }
}