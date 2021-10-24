export class ExternalServiceError extends Error {
    constructor(msg: string) {
        console.log('GOT External Service ERROR:  ', msg)
        super('External service error:  ' + msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ExternalServiceError.prototype);
    }
}