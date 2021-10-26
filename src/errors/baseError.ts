export class BaseError extends Error {

    constructor(
        public readonly description: string,
        public readonly httpCode: number,
        public readonly details: string = '',
    ) {
        super(description);
        Object.setPrototypeOf(this, BaseError.prototype);

        this.httpCode = httpCode;
        this.details = details;

        Error.captureStackTrace(this);
    }
}