/* eslint-disable no-undef */
'use strict';
const express = require('express');
const dotenv = require('dotenv');
const { logger } = require('./middleware/logger.js');
const { errorHandler } = require('./middleware/errorHandler.js');

const blogRoute = require('./routes/blog.js');
const authRoute = require('./routes/tokenAuth.js');

const app = express();
app.use(express.json());
dotenv.config();

// Env variables
const PORT = process.env.PORT;

// Implement middlewares
app.use(logger);
app.use(errorHandler);

// app.METHOD(PATH, HANDLER);
app.use(express.static('public'));

app.use('/api/users', authRoute);
app.use('/api/blogs', blogRoute);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
});
