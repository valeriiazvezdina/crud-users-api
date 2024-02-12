export class NotExistingEndpointError extends Error {
    constructor() {
        super();
        this.message = "Such endpoint doesn't exist";
    }
}