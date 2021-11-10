require('dotenv').config(); // check if one is enough
import express = require('express');
import swaggerUi from 'swagger-ui-express';

import appRouter from './routes/router';
import errorHandler from './middleware/errorHandler';
import { swaggerDocument } from './docs/swagger';

const app: express.Application = express();


app.use(express.json())

const PORT = process.env.PORT;

app.use(appRouter);

app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
});