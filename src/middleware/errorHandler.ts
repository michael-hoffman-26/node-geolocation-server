import { BaseError } from '../errors/baseError';

const errorHandler = (error, req, res, next) => {
    if (error instanceof BaseError) {
        printError(error, true);
        return res.status(error.httpCode).json({ error: error.description })
    } else {
        printError(error, false);
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const printError = (error: Error, catchedError: boolean) => {
    console.error({ catchedError, error });
}

export default errorHandler;
