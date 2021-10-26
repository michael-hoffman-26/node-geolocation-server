import { BaseError } from "./baseError";

export class ExternalServiceError extends BaseError {
    constructor(details: string = '') {

        super('Internal Service Error', 500, details);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ExternalServiceError.prototype);
    }
}