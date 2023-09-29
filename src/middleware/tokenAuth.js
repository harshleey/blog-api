import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/custom-errors.js";

const SECRET = process.env.SECRET;

async function tokenAuth(req, res, next) {
  const headers = req.headers.authorization;
  console.log(headers);
  if (!headers || !headers.startsWith("Bearer ")) {
    throw new CustomError("Unauthorized.", StatusCodes.UNAUTHORIZED);
  }
  const token = headers.split(" ")[1];
  try {
    const user = jwt.verify(token, SECRET);
    console.log(user);
    req.user = { id: user.id, username: user.username };
    next();
  } catch (error) {
    throw new CustomError("Unauthorized.", StatusCodes.UNAUTHORIZED);
  }
}

export { tokenAuth };
