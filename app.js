require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const expressUpload = require('express-fileupload');
const mongoose = require('mongoose');
const app = express();

const db = require('./db');

const userRoute = require('./src/routes/user.route');
const linkRoute = require('./src/routes/link.route');
const { errorConverter, errorHandler } = require('./src/middleware/error');
app.use(
    expressUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/'
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/user/v1', userRoute);
app.use('/link/v1', linkRoute);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(3444, () => console.log(`Listening on: 3444`));

//module.exports.handler = serverless(app);
