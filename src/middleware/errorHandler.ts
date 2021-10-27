import express from 'express';

import { BaseError } from '../errors/baseError';

const errorHandler = express.Router();

errorHandler.use((error, req, res, next) => {
    console.log('error handler:  ', error);
    if (error instanceof BaseError) {
        printError(error, true);
        return res.status(error.httpCode).json({ error: error.description })
    } else {
        printError(error, false);
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export const printError = (error: Error, catchedError: boolean) => {
    console.error({ catchedError, error });
}

export default errorHandler;
