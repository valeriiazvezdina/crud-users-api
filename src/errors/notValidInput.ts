export class NotValidInput extends Error {
    constructor() {
        super();
        this.message = 'Invalid input';
    }
}