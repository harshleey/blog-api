/* eslint-disable no-undef */
const { StatusCodes } = require('http-status-codes');

function notFound(req, res) {
    res.status(StatusCodes.NOT_FOUND).send('Route does not exist.');
}

module.exports = { notFound };
