/* eslint-disable no-undef */
const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors/custom-errors.js');

function errorHandler(err, req, res) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
    });
}

module.exports = { errorHandler };
