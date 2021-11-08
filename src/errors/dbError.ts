import { BaseError } from "./baseError";

export class DBError extends BaseError {
    constructor(details: string) {
        super('Internal Server Error', 500, details);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DBError.prototype);
    }
}