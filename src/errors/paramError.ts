import { BaseError } from "./baseError";

export class paramError extends BaseError {
    constructor(msg: string) {
        super(msg, 400);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, paramError.prototype);
    }
}