/* eslint-disable no-undef */
const { database } = require('../libs/prisma.js');

function asyncWrapper(fn) {
    return async function (req, res, next) {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        } finally {
            await database.$disconnect();
        }
    };
}

module.exports = { asyncWrapper };
