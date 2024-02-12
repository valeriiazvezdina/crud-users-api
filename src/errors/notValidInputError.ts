export class NotValidInputError extends Error {
    constructor() {
        super();
        this.message = 'Invalid input';
    }
}