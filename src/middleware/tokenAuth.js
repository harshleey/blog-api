/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors/custom-errors.js');

const SECRET = process.env.SECRET;

async function tokenAuth(req, res, next) {
    const headers = req.headers.authorization;
    if (!headers || !headers.startsWith('Bearer ')) {
        throw new CustomError('Unauthorized.', StatusCodes.UNAUTHORIZED);
    }
    const token = headers.split(' ')[1];
    try {
        const user = jwt.verify(token, SECRET);
        req.user = { id: user.id, username: user.username };
        next();
    } catch (error) {
        throw new CustomError('Unauthorized.', StatusCodes.UNAUTHORIZED);
    }
}

module.exports = { tokenAuth };
