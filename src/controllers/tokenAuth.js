/* eslint-disable no-undef */
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { asyncWrapper } = require('../middleware/async-wrapper.js');
const { CustomError } = require('../errors/custom-errors.js');
const { database } = require('../libs/prisma.js');
const { logger } = require('../middleware/logger.js');

const SECRET = process.env.SECRET;
const LIFETIME = process.env.JWT_LIFETIME;

/**
 * signUser - this function takes in a user, a secret, a jwt expiresIn, and * *  returns a jwt token
 * @param {Object} user
 * @param {String} secret
 * @param {String} lifetime
 * @returns {token}
 */
function signUser(user, secret, lifetime) {
    return jwt.sign({ id: user.id, username: user.username }, secret, {
        expiresIn: lifetime,
    });
}

/**
 * Register function
 */
const register = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const oldUser = await database.user.findFirst({ where: { username } });
    if (oldUser) {
        return res.status(400).json({
            error: `User with username ${username} already exists.`,
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await database.user.create({
        data: { username, passwordHash },
        select: { id: true, username: true },
    });

    const token = signUser(user, SECRET, LIFETIME);
    res.status(StatusCodes.CREATED).json({ token, errors: null });
});

/**
 * Login function
 */
const login = asyncWrapper(async (req, res) => {
    try {
        const { username, password } = req.body;
        const oldUser = await database.user.findUnique({
            where: { username },
        });
        if (!oldUser) {
            throw new CustomError(
                'Invalid credentials.',
                StatusCodes.BAD_REQUEST,
            );
        }

        const correctPassword = await bcrypt.compare(
            password,
            oldUser.passwordHash,
        );
        if (!correctPassword) {
            throw new CustomError(
                'Invalid credentials',
                StatusCodes.BAD_REQUEST,
            );
        }

        const token = signUser(oldUser, SECRET, LIFETIME);
        res.status(StatusCodes.OK).json({ token, errors: null });
    } catch (error) {
        logger.error(error.message, {
            stack: error.stack,
            customData: 'additional data',
        });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal Server Error',
        });
    }
});

/**
 * Profile
 */
const profile = asyncWrapper(async (req, res) => {
    const { id, username } = req.user;
    const blogs = await database.blog.findMany({ where: { userId: id } });
    res.status(StatusCodes.OK).json({ user: { id, username, blogs } });
});

module.exports = { register, login, profile };
