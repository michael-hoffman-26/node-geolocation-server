export class paramError extends Error {
    constructor(msg: string) {
        console.error('Param Error:  ', msg)
        super('Error Message: ' + msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, paramError.prototype);
    }
}