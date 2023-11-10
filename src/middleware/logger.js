/* eslint-disable no-undef */
const logged = require('logger');

function logger(req, res, next) {
    logged(`Received ${req.method} request to ${req.path}`);
    next();
}

module.exports = { logger };
