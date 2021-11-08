require('dotenv').config(); // check if one is enaougth
import express = require('express');

import appRouter from './routes/router';
import errorHandler from './middleware/errorHandler';


const app: express.Application = express();


app.use(express.json())

const PORT = process.env.PORT;

app.use(appRouter);

app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
});