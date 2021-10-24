export class DBError extends Error {
    constructor(msg: string) {
        console.log('GOT DB ERROR:  ', msg)
        super('DB Error:  ' + msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DBError.prototype);
    }
}