import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncWrapper } from "../middleware/async-wrapper.js";
import { CustomError } from "../errors/custom-errors.js";
import { database } from "../libs/prisma.js";

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
    throw new CustomError(
      `User with username ${username} already exists.`,
      StatusCodes.BAD_REQUEST
    );
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
  const { username, password } = req.body;
  const oldUser = await database.user.findUnique({
    where: { username },
  });
  if (!oldUser) {
    throw new CustomError("Invalid credentials.", StatusCodes.BAD_REQUEST);
  }

  const correctPassword = await bcrypt.compare(password, oldUser.passwordHash);
  if (!correctPassword) {
    throw new CustomError("Invalid credentials", StatusCodes.BAD_REQUEST);
  }

  const token = signUser(oldUser, SECRET, LIFETIME);
  res.status(StatusCodes.OK).json({ token, errors: null });
});

/**
 * Profile
 */
const profile = asyncWrapper(async (req, res) => {
  // console.log(req.user.id);
  const { id, username } = req.user;
  const blogs = await database.blog.findMany({ where: { userId: id } });
  res.status(StatusCodes.OK).json({ user: { id, username, blogs } });
});

export { register, login, profile };
