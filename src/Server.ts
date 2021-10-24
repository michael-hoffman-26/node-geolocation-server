import express = require('express');
import appRouter from './routes/router';
require('dotenv').config();

const app: express.Application = express();


app.use(express.json())

const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
});

app.use(appRouter);