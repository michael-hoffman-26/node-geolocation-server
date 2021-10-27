require('dotenv').config(); // check if one is enaougth
import express = require('express');

import appRouter from './routes/router';
import errorHandler from './middleware/errorHandler';
import { BaseError } from './errors/baseError';


const app: express.Application = express();


app.use(express.json())

const PORT = process.env.PORT;

app.use(appRouter);

// app.use(errorHandler);

app.use((error, req, res, next) => {
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


app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
});